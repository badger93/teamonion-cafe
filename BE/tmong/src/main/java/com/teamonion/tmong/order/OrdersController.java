package com.teamonion.tmong.order;

import com.teamonion.tmong.security.CheckJwt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api")
@RestController
public class OrdersController {

    private final OrdersService ordersService;

    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping("/{member_id}/orders")
    public ResponseEntity orderProceed(@Valid OrdersAddRequest ordersAddRequest) {
        return new ResponseEntity<>(ordersService.add(ordersAddRequest), HttpStatus.CREATED);
    }

    @CheckJwt
    @GetMapping("/{member_id}/orders")
    public ResponseEntity<Page<OrdersHistoryResponse>> myOrder(Pageable pageable, @PathVariable Long member_id, boolean pickup) {
        return new ResponseEntity<>(ordersService.getMyOrders(pageable, member_id, pickup), HttpStatus.OK);
    }

}
