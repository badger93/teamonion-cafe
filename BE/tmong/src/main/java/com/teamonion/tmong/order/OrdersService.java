package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberService;
import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.menu.MenuRepository;
import com.teamonion.tmong.security.JwtComponent;
import com.teamonion.tmong.websocket.StompInterceptor;
import com.teamonion.tmong.websocket.WebSocketResponse;
import com.teamonion.tmong.statistics.StatisticsService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrdersService {
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

    @NonNull
    private final StatisticsService statisticsService;

    private static final Logger log = LoggerFactory.getLogger(OrdersService.class);

    @Transactional
    public OrdersResponse makeOrder(OrdersAddRequest ordersAddRequest) {
        String buyerId = jwtComponent.getClaimValueByToken(JwtComponent.MEMBER_ID);
        Member buyer = memberService.findByMemberId(buyerId);

        Orders orders = makeOrdersDetail(ordersAddRequest, buyer);

        pointService.pointProcess(orders);

        orders = ordersRepository.save(orders);

        statisticsService.save(buyer.getMemberId());

        return new OrdersResponse(orders);
    }

    private Orders makeOrdersDetail(OrdersAddRequest ordersAddRequest, Member buyer) {
        if (ordersAddRequest.getMenuIdList().size() == 0) {
            throw new HandleRuntimeException(GlobalExceptionType.ORDER_MENU_NOT_FOUND);
        }

        List<Menu> menuList = new ArrayList<>();
        long amount = 0;

//        menuList = ordersAddRequest.getMenuIdList().stream().filter(e -> menuRepository.findByIdAndDeletedFalse(e)).collect(Collectors.toList());
        for (Long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findByIdAndDeletedFalse(id)
                    .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
            menuList.add(menu);
            amount += menu.getPrice();
        }

        return ordersAddRequest.toEntity(amount, buyer, menuList);
    }


    public Page<OrdersResponse> getMyOrders(Pageable pageable, boolean pickup) {
        Long buyer_id = memberService.findByMemberId(jwtComponent.getClaimValueByToken(JwtComponent.MEMBER_ID)).getId();
        return ordersRepository.findByBuyerIdAndPickup(pageable, buyer_id, pickup)
                .map(OrdersResponse::new);
    }

    Page<OrdersResponse> getOrdersByCategory(Pageable pageable, String category) {
        jwtComponent.checkAdmin();

        Page<Orders> response;
        switch (category) {
            case "PAID_TRUE":
                response = ordersRepository.findAllByPaidTrue(pageable);
                break;
            case "PAID_FALSE":
                response = ordersRepository.findAllByPaidFalse(pageable);
                break;
            case "MADE_TRUE":
                response = ordersRepository.findAllByMadeTrue(pageable);
                break;
            case "PICKUP_FALSE":
                response = ordersRepository.findAllByPickupFalse(pageable);
                break;
            case "ALL":
                response = ordersRepository.findAll(pageable);
                break;
            default:
                throw new HandleRuntimeException(GlobalExceptionType.ORDER_CATEGORY_INVALID);
        }
        return response.map(OrdersResponse::new);
    }

    @Transactional
    public WebSocketResponse updateOrder(OrdersUpdateRequest ordersUpdateRequest) {
        try {
            if (ordersUpdateRequest.getId() == null) {
                throw new RuntimeException("주문 번호 정보가 올바르지 않습니다");
            }

            if (ordersUpdateRequest.getBuyerId() == null) {
                throw new RuntimeException("주문자 정보가 올바르지 않습니다");
            }

            Orders orders = ordersRepository.findById(ordersUpdateRequest.getId())
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

            WebSocketResponse webSocketResponse = new WebSocketResponse(ordersRepository.save(orders));

            Long count = ordersRepository.countByBuyerIdAndPickupFalse(orders.getBuyer().getId());

            if(count == 0) {
                webSocketResponse.setLast(true);
            }

            return webSocketResponse;
        } catch (HandleRuntimeException e) {
            return ordersUpdateRequest.toEntity(false, e.getErrorMessage());
        } catch (RuntimeException e) {
            return ordersUpdateRequest.toEntity(false, e.getMessage());
        }

    }

}
