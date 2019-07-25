package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberRepository;
import com.teamonion.tmong.member.MemberService;
import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.menu.MenuRepository;
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
    private static final Logger logger = LoggerFactory.getLogger(OrdersService.class);

    @NonNull
    private final OrdersRepository ordersRepository;

    @NonNull
    private final MenuRepository menuRepository;

    @NonNull
    private final MemberRepository memberRepository;

    private static final double BONUS_RATE = 0.1;

    @Transactional
    public long add(OrdersAddRequest ordersAddRequest) {
        Member buyer = memberRepository.findById(ordersAddRequest.getMember_id())
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.ORDER_MEMBER_NOT_FOUND));

        List<Menu> menuList = new ArrayList<>();
        int amount = 0;

        for (long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findById(id)
                    .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
            menuList.add(menu);
            amount += Integer.parseInt(menu.getPrice());
        }

        int buyerOwnPoint = Integer.parseInt(buyer.getPoint());
        if (ordersAddRequest.getPaymentType().equals(PaymentType.POINT)) {
            buyerOwnPoint = Integer.parseInt(payByPoint(buyer, buyerOwnPoint, amount));
        }
        addBonusPoint(buyer, buyerOwnPoint, amount);

        return ordersRepository.save(ordersAddRequest.toEntity(String.valueOf(amount), buyer, menuList)).getId();
    }

    private String payByPoint(Member buyer, int buyerOwnPoint, int amount) {
        int point = buyerOwnPoint - amount;

        if (point < 0) {
            throw new HandleRuntimeException(GlobalExceptionType.ORDER_POINT_LACK);
        }

        return pointUpdate(buyer.getId(), String.valueOf(point));
    }

    private void addBonusPoint(Member buyer, int buyerOwnPoint, int amount) {
        int point = (int) (amount * BONUS_RATE) + buyerOwnPoint;

        pointUpdate(buyer.getId(), String.valueOf(point));
    }

    public Page<OrdersHistoryResponse> getMyOrders(Pageable pageable, Long buyer_id, boolean pickup) {
        return ordersRepository.findByBuyerIdAndPickup(pageable, buyer_id, pickup)
                .map(orders -> new OrdersHistoryResponse(orders));
    }

    private String pointUpdate(long id, String point) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.ORDER_MEMBER_NOT_FOUND));
        member.pointUpdate(point);
        return memberRepository.save(member).getPoint();
    }

}
