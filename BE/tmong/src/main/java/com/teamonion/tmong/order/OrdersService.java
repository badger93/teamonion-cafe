package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberRepository;
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
    private static Logger logger = LoggerFactory.getLogger(OrdersService.class);

    @NonNull
    private final OrdersRepository ordersRepository;

    @NonNull
    private final MenuRepository menuRepository;

    @NonNull
    private final MemberRepository memberRepository;

    private final double DISCOUNT_RATE = 0.1;

    @Transactional
    public OrdersAddResponse add(OrdersAddRequest ordersAddRequest) {
        // TODO : Code Convention
        Member buyer = memberRepository.findById(ordersAddRequest.getMember_id())
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.ORDER_MEMBER_NOT_FOUND));

        List<Menu> menuList = new ArrayList<>();
        int amount = 0;

        for (Long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findById(id)
                    .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
            menuList.add(menu);
            amount += Integer.parseInt(menu.getPrice());
        }

        int buyerPoint = Integer.parseInt(buyer.getPoint());
        if (ordersAddRequest.getPaymentType().equals(PaymentType.POINT)) {
            if (buyerPoint < amount) {
                throw new HandleRuntimeException(GlobalExceptionType.ORDER_POINT_LACK);
            }
            payByUsingPoint(buyer, buyerPoint, amount);
        }
        addBonusPoint(buyer, buyerPoint, amount);

        Orders orders = ordersAddRequest.toEntity(String.valueOf(amount), buyer, menuList);
        return new OrdersAddResponse(buyer, ordersRepository.save(orders));
    }

    private void payByUsingPoint(Member member, int buyerPoint, int amount) {
        int point = buyerPoint - amount;

        if (point < 0) {
            throw new HandleRuntimeException(GlobalExceptionType.ORDER_POINT_LACK);
        }

        member.pointUpdate(String.valueOf(point));
        memberRepository.save(member);
    }

    private void addBonusPoint(Member member, int buyerPoint, int amount) {
        int point = (int)(amount * DISCOUNT_RATE) + buyerPoint;

        member.pointUpdate(String.valueOf(point));
        memberRepository.save(member);
    }

    public Page<OrdersHistoryResponse> getMyOrders(Pageable pageable, Long buyer_id, boolean pickup) {
        return ordersRepository.findByBuyerIdAndPickup(pageable, buyer_id, pickup)
                .map(orders -> new OrdersHistoryResponse(orders));
    }
}
