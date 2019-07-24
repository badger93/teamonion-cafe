package com.teamonion.tmong.order;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class OrdersController {

    private final OrdersService ordersService;

    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping("/{member_id}/orders")
    public ResponseEntity orderProceed(@RequestBody OrdersAddRequest ordersAddRequest) {
        ordersService.add(ordersAddRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }

}
