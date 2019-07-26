package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
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
    private static final Logger logger = LoggerFactory.getLogger(OrdersService.class);

    @NonNull
    private final OrdersRepository ordersRepository;

    @NonNull
    private final MenuRepository menuRepository;

    @NonNull
    private final MemberService memberService;

    @NonNull
    private final PointService pointService;

    @NonNull
    private final JwtComponent jwtComponent;

    @Transactional
    public Long makeOrder(OrdersAddRequest ordersAddRequest) {
        // TODO : Transactional 메소드 필요한지
        Member buyer = memberService.findByMemberId(jwtComponent.getClaimValueByToken(JwtComponent.MEMBER_ID));

        Orders orders = makeOrderDetail(ordersAddRequest, buyer);

        pointService.proceedOrder(orders);

        return ordersRepository.save(orders).getId();
    }

    private Orders makeOrderDetail(OrdersAddRequest ordersAddRequest, Member buyer) {
        List<Menu> menuList = new ArrayList<>();
        long amount = 0;

        for (Long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findByIdAndDeletedFalse(id)
                    .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
            menuList.add(menu);
            amount += menu.getPrice();
        }

        return ordersAddRequest.toEntity(amount, buyer, menuList);
    }


    public Page<OrdersHistoryResponse> getMyOrders(Pageable pageable, Long buyer_id, boolean pickup) {
        return ordersRepository.findByBuyerIdAndPickup(pageable, buyer_id, pickup)
                .map(OrdersHistoryResponse::toOrderHistoryResponse);
    }

    Page<OrdersHistoryResponse> getAllOrders(Pageable pageable, String category) {
        // 카테고리 구분
        // 카테고리 별 검색
        switch (category) {
            case "PAID_TRUE":
                return ordersRepository.findAllByPaidTrue(pageable).map(OrdersHistoryResponse::AllOrdersHistoryResponse);
            case "PAID_FALSE":
                return ordersRepository.findAllByPaidFalse(pageable).map(OrdersHistoryResponse::AllOrdersHistoryResponse);
            case "MADE_TRUE":
                return ordersRepository.findAllByMadeTrue(pageable).map(OrdersHistoryResponse::AllOrdersHistoryResponse);
        }
        return ordersRepository.findAll(pageable).map(OrdersHistoryResponse::AllOrdersHistoryResponse);
    }
}
