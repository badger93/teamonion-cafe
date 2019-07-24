package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
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
    private final MemberService memberService;

    private static final double BONUS_RATE = 0.1;

    @Transactional
    public Long add(OrdersAddRequest ordersAddRequest) {
        Member buyer = memberService.findById(ordersAddRequest.getMember_id());

        List<Menu> menuList = new ArrayList<>();
        int amount = 0;

        for (Long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findById(id)
                    .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
            menuList.add(menu);
            amount += Integer.parseInt(menu.getPrice());
        }

        int buyerOwnPoint = memberService.getPoint(buyer.getId());

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

        return memberService.pointUpdate(buyer.getId(), String.valueOf(point));
    }

    private void addBonusPoint(Member buyer, int buyerOwnPoint, int amount) {
        int point = (int) (amount * BONUS_RATE) + buyerOwnPoint;

        memberService.pointUpdate(buyer.getId(), String.valueOf(point));
    }

    public Page<OrdersHistoryResponse> getMyOrders(Pageable pageable, Long buyer_id, boolean pickup) {
        return ordersRepository.findByBuyerIdAndPickup(pageable, buyer_id, pickup)
                .map(orders -> new OrdersHistoryResponse(orders));
    }

    private List<Menu> arrangOrderMenuList(List<Long> menuIdList) {
        List<Menu> menuList = new ArrayList<>();
        menuIdList.forEach(e -> menuList.add((menuRepository.findById(e)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND)))));
        return menuList;
    }

}
