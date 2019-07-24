package com.teamonion.tmong.order;

import com.teamonion.tmong.security.CheckJwt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @CheckJwt
    @GetMapping("/{member_id}/orders")
    public ResponseEntity myOrder(@PathVariable Long member_id) {

        return null;
    }

}
