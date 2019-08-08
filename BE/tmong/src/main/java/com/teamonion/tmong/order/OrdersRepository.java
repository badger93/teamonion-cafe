package com.teamonion.tmong.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    Page<Orders> findByBuyerIdAndPickup(Pageable pageable, Long buyer_id, boolean pickup);

    Page<Orders> findAllByPaidFalse(Pageable pageable);

    Page<Orders> findAllByPaidTrue(Pageable pageable);

    Page<Orders> findAllByMadeTrue(Pageable pageable);

    Page<Orders> findAllByPickupFalse(Pageable pageable);

    List<Orders> findByCreatedDateBetween(LocalDateTime start, LocalDateTime end);
}
