package com.teamonion.tmong.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public enum OrdersCategory {
    PAID_TRUE {
        @Override
        Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable) {
            return ordersRepository.findAllByPaidTrue(pageable);
        }
    },
    PAID_FALSE {
        @Override
        Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable) {
            return ordersRepository.findAllByPaidFalse(pageable);
        }
    },
    MADE_TRUE {
        @Override
        Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable) {
            return ordersRepository.findAllByMadeTrue(pageable);
        }
    },
    PICKUP_FALSE {
        @Override
        Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable) {
            return ordersRepository.findAllByPickupFalse(pageable);
        }
    },
    ALL {
        @Override
        Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable) {
            return ordersRepository.findAll(pageable);
        }
    };

    abstract Page<Orders> getOrders(OrdersRepository ordersRepository, Pageable pageable);
}
