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
