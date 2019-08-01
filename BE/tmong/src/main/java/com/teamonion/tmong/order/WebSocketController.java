package com.teamonion.tmong.order;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class WebSocketController {

    private static final Logger log = LoggerFactory.getLogger(WebSocketController.class);

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/api/orders/update")
    @SendTo("/topic/order")
    public OrdersResponse updateOrder(@Payload OrdersUpdateRequest ordersUpdateRequest
            , SimpMessageHeaderAccessor simpMessageHeaderAccessor) {

        Principal user = simpMessageHeaderAccessor.getUser();


        // 상태바꾼 관리자
        // simpMessagingTemplate.convertAndSendToUser(user.getName(),"/topic/order",ordersUpdateRequest);

        // 상태의 주인공

        log.info("--------------------------------");
        log.info("-------------updateOrder--------");
        log.info("payload ordersupdaterequest : {}", ordersUpdateRequest);
        log.info("--------------------------------");
        log.info("--------------------------------");
        log.info("User Name : {}" , user.getName());
        log.info("User Info : {}" , user.toString());
        log.info("--------------------------------");
        log.info("Session Id : {}" , simpMessageHeaderAccessor.getSessionId());
        log.info("Subscription Id : {}" , simpMessageHeaderAccessor.getSubscriptionId());
        log.info("Destination : {}" , simpMessageHeaderAccessor.getDestination());
        log.info("Message Type : {}" , simpMessageHeaderAccessor.getMessageType());

        log.info("--------------------------------");
        log.info("DetailLogMessage : {}" , simpMessageHeaderAccessor.getDetailedLogMessage(ordersUpdateRequest));

        return ordersService.updateOrder(ordersUpdateRequest);
    }
}
