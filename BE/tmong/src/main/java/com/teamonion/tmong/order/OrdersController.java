package com.teamonion.tmong.order;

import com.teamonion.tmong.security.CheckJwt;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/orders")
@RestController
@RequiredArgsConstructor
public class OrdersController {
    private static final Logger log = LoggerFactory.getLogger(OrdersController.class);

    private final OrdersService ordersService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    @CheckJwt
    @PostMapping
    public ResponseEntity makeOrder(@RequestBody @Valid OrdersAddRequest ordersAddRequest) {
        OrdersResponse ordersResponse = ordersService.makeOrder(ordersAddRequest);

        ResponseEntity makeOrderResponse = new ResponseEntity<>(ordersResponse.getId(), HttpStatus.CREATED);
        
        simpMessagingTemplate.convertAndSend("/topic/orders/add", ordersResponse);

        return makeOrderResponse;
    }

    @CheckJwt
    @GetMapping("/my")
    public ResponseEntity<Page<OrdersResponse>> getMyOrders(
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable, boolean pickup) {
        return new ResponseEntity<>(ordersService.getMyOrders(pageable, pickup), HttpStatus.OK);
    }

    @CheckJwt
    @GetMapping
    public ResponseEntity<Page<OrdersResponse>> getOrdersByCategory(
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable, String category) {
        return new ResponseEntity<>(ordersService.getOrdersByCategory(pageable, category), HttpStatus.OK);
    }

}
