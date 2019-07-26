package com.teamonion.tmong.order;

import com.teamonion.tmong.security.CheckJwt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/orders")
@RestController
public class OrdersController {

    private final OrdersService ordersService;

    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @CheckJwt
    @PostMapping("/orders")
    public ResponseEntity makeOrder(@RequestBody @Valid OrdersAddRequest ordersAddRequest) {
        return new ResponseEntity<>(ordersService.makeOrder(ordersAddRequest), HttpStatus.CREATED);
    }

    @CheckJwt
    @GetMapping("/my")
    public ResponseEntity<Page<OrdersHistoryResponse>> getMyOrders(Pageable pageable, boolean pickup) {
        return new ResponseEntity<>(ordersService.getMyOrders(pageable, pickup), HttpStatus.OK);
    }

    @CheckJwt
    @PutMapping("/{order_id}")
    public ResponseEntity updateOrder(@PathVariable Long order_id, @RequestBody OrdersUpdateRequest ordersUpdateRequest) {
        ordersService.updateOrder(order_id, ordersUpdateRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @CheckJwt
    @GetMapping("/orders")
    public ResponseEntity<Page<OrdersCategoryResponse>> getOrdersByCategory(Pageable pageable, String category) {
        return new ResponseEntity<>(ordersService.getOrdersByCategory(pageable, category), HttpStatus.OK);
    }

}
