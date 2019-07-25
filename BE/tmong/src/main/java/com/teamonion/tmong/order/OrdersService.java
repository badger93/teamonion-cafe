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

    @NonNull
    private final PointService pointService;

    @Transactional
    public Long add(Long member_id, OrdersAddRequest ordersAddRequest) {
        Member buyer = memberService.findById(member_id);

        Orders orders = getOrdersDetail(ordersAddRequest, buyer);

        pointService.proceedOrder(orders);

        return ordersRepository.save(orders).getId();
    }

    private Orders getOrdersDetail(OrdersAddRequest ordersAddRequest, Member buyer) {
        List<Menu> menuList = new ArrayList<>();
        long amount = 0;

        for (Long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findById(id)
                    .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
            menuList.add(menu);
        }

        return ordersAddRequest.toEntity(amount, buyer, menuList);
    }


    public Page<OrdersHistoryResponse> getMyOrders(Pageable pageable, Long buyer_id, boolean pickup) {
        return ordersRepository.findByBuyerIdAndPickup(pageable, buyer_id, pickup)
                .map(OrdersHistoryResponse::toOrderHistoryResponse);
    }

    Page<OrdersHistoryResponse> getAllOrders(Pageable pageable, boolean paid, boolean made, boolean pickup) {
        return ordersRepository.findByPaidAndMadeAndPickup(pageable, paid, made, pickup)
                .map(OrdersHistoryResponse::new);
    }
}
