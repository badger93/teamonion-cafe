package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberService;
import com.teamonion.tmong.menu.MenuService;
import com.teamonion.tmong.authorization.JwtComponent;
import com.teamonion.tmong.statistics.StatisticsService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class OrdersService {
    @NonNull
    private final OrdersRepository ordersRepository;

    @NonNull
    private final MenuService menuService;

    @NonNull
    private final MemberService memberService;

    @NonNull
    private final PointService pointService;

    @NonNull
    private final JwtComponent jwtComponent;

    @NonNull
    private final StatisticsService statisticsService;

    @Transactional
    public OrdersResponse makeOrder(OrdersAddRequest ordersAddRequest) {
        Member buyer = memberService.findByMemberId(jwtComponent.getClaimValueByToken(JwtComponent.MEMBER_ID));

        Orders orders = ordersAddRequest.toEntity(buyer, menuService.getOrderMenus(ordersAddRequest.getMenuIdList()));

        pointService.pointProcess(orders);

        statisticsService.save(buyer.getMemberId());

        return new OrdersResponse(ordersRepository.save(orders));
    }

    public Page<OrdersResponse> getMyOrders(Pageable pageable, boolean pickup) {
        Long buyer_id = memberService.findByMemberId(jwtComponent.getClaimValueByToken(JwtComponent.MEMBER_ID)).getId();
        return ordersRepository.findByBuyerIdAndPickup(pageable, buyer_id, pickup)
                .map(OrdersResponse::new);
    }

    Page<OrdersResponse> getOrdersByCategory(Pageable pageable, String category) {
        Page<Orders> response;
        // TODO : enum 활용 interface 구현 가능
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
                throw new GlobalException(GlobalExceptionType.ORDER_CATEGORY_INVALID);
        }
        return response.map(OrdersResponse::new);
    }

}
