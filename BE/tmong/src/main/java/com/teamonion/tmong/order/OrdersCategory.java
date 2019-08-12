package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.exception.GlobalExceptionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public enum OrdersCategory {
    PAID_TRUE,
    PAID_FALSE,
    MADE_TRUE,
    PICKUP_FALSE,
    ALL;

    /**
     * abstract Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable);
     * 추상 메소드로 작성해 구현하면 switch case 문을 없앨 수 있지 않을까요?
     * enum 에서 if else 를 처리하기 위해 자주 사용하는 방법이기도 해요
     *
     * PAID_TRUE {
     *         @Override
     *         Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable) {
     *             return null;
     *         }
     *     },
     */

    public Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable) {
        switch (this) {
            case PAID_TRUE:
                return ordersRepository.findAllByPaidTrue(pageable);
            case PAID_FALSE:
                return ordersRepository.findAllByPaidFalse(pageable);
            case MADE_TRUE:
                return ordersRepository.findAllByMadeTrue(pageable);
            case PICKUP_FALSE:
                return ordersRepository.findAllByPickupFalse(pageable);
            case ALL:
                return ordersRepository.findAll(pageable);
            default:
                throw new GlobalException(GlobalExceptionType.ORDER_CATEGORY_INVALID);
        }
    }
}
