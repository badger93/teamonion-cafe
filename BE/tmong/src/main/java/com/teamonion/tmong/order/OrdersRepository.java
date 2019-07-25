package com.teamonion.tmong.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    Page<Orders> findByBuyerIdAndPickup(Pageable pageable, Long buyer_id, boolean pickup);

    Page<Orders> findByPaidAndMadeAndPickup(Pageable pageable, boolean paid, boolean made, boolean pickup);
}
