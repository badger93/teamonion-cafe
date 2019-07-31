package com.teamonion.tmong.order;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    private static final Logger log = LoggerFactory.getLogger(WebSocketController.class);

    @Autowired
    private OrdersService ordersService;

    @MessageMapping("/api/orders/update")
    @SendTo("/topic/order")
    public ResponseEntity<OrdersCategoryResponse> updateOrder(@Payload OrdersUpdateRequest ordersUpdateRequest) {
        log.info("--------------------------------");
        log.info("-------------updateOrder--------");
        log.info("--------------------------------");
        return new ResponseEntity<>(ordersService.updateOrder(ordersUpdateRequest), HttpStatus.OK);
    }
}
