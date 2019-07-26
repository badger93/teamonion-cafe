package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberRepository;
import com.teamonion.tmong.member.MemberService;
import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.menu.MenuRepository;
import com.teamonion.tmong.security.JwtComponent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OrdersService {
    private static final Logger log = LoggerFactory.getLogger(OrdersService.class);

    @NonNull
    private final OrdersRepository ordersRepository;

    @NonNull
    private final MenuRepository menuRepository;

    @NonNull
    private final MemberRepository memberRepository;

    @NonNull
    private final MemberService memberService;

    @NonNull
    private final JwtComponent jwtComponent;

    private static final double BONUS_RATE = 0.1;

    @Transactional
    public Long add(Long member_id, OrdersAddRequest ordersAddRequest) {

        // 1. 회원정보조회
        // 2. 주문 정보 정리
        // 3. 포인트 처리
        // 4. 묶기

//        memberService.getMember();
//        Orders order = getOrders();
//        pointService.process();
//        Data data = orderRe.save(orders);
//        return data.getId();

        Member buyer = memberRepository.findById(member_id)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.ORDER_MEMBER_NOT_FOUND));

        List<Menu> menuList = new ArrayList<>();
        long amount = 0;

        for (Long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findById(id)
                    .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
            menuList.add(menu);
            amount += menu.getPrice();
        }

        long buyerOwnPoint = buyer.getPoint();
        if (ordersAddRequest.getPaymentType().equals(PaymentType.POINT)) {
            buyerOwnPoint = payByPoint(buyer, buyerOwnPoint, amount);
        }
        addBonusPoint(buyer, buyerOwnPoint, amount);

        return ordersRepository.save(ordersAddRequest.toEntity(amount, buyer, menuList)).getId();
    }

    private long payByPoint(Member buyer, long buyerOwnPoint, long amount) {
        long point = buyerOwnPoint - amount;

        if (point < 0) {
            throw new HandleRuntimeException(GlobalExceptionType.ORDER_POINT_LACK);
        }

        return pointUpdate(buyer.getId(), point);
    }

    private void addBonusPoint(Member buyer, long buyerOwnPoint, long amount) {
        long point = (long) (amount * BONUS_RATE) + buyerOwnPoint;

        pointUpdate(buyer.getId(), point);
    }

    private long pointUpdate(Long id, long point) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.ORDER_MEMBER_NOT_FOUND));
        member.pointUpdate(point);
        return memberRepository.save(member).getPoint();
    }

    public Page<OrdersHistoryResponse> getMyOrders(Pageable pageable, boolean pickup) {
        Long buyer_id = memberService.findByMemberId(jwtComponent.getClaimValueByToken(JwtComponent.MEMBER_ID)).getId();
        return ordersRepository.findByBuyerIdAndPickup(pageable, buyer_id, pickup)
                .map(OrdersHistoryResponse::new);
    }

    public void updateOrder(Long order_id, OrdersUpdateRequest ordersUpdateRequest) {
        jwtComponent.checkAdmin();
        Orders orders = ordersRepository.findById(order_id)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.ORDER_NOT_FOUND));

        if (ordersUpdateRequest.isPaid()) {
            orders.pay();
        }
        if (ordersUpdateRequest.isMade()) {
            orders.make();
        }
        if (ordersUpdateRequest.isPickup()) {
            orders.pick();
        }
        ordersRepository.save(orders);
    }
}
