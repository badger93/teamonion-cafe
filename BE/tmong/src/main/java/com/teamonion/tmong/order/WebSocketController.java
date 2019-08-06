package com.teamonion.tmong.order;

import com.teamonion.tmong.config.StompInterceptor;
import com.teamonion.tmong.security.CheckJwt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
public class WebSocketController {

    private static final Logger log = LoggerFactory.getLogger(WebSocketController.class);

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @CheckJwt
    @MessageMapping("/api/orders/update")
    public WebSocketResponse updateOrder(@Payload OrdersUpdateRequest ordersUpdateRequest,
                                         SimpMessageHeaderAccessor simpMessageHeaderAccessor) {

//        Principal user = simpMessageHeaderAccessor.getUser();
        log.info("------------------------------------");
        log.info("------------ updateOrder -----------");
        log.info("payload ordersupdaterequest : {}", ordersUpdateRequest);
        WebSocketResponse webSocketResponse = ordersService.updateOrder(ordersUpdateRequest);
        log.info("------------------------------------");

        // 상태바꾼 관리자
        String adminSessionId = simpMessageHeaderAccessor.getSessionId();
        simpMessagingTemplate.convertAndSendToUser(adminSessionId,"/queue/order", webSocketResponse);


        // 상태의 주인공
        String buyerSessionId = StompInterceptor.getProcessingSessions().get(webSocketResponse.getBuyerId());

        log.info("buyerSessionId is NULL??????????");
        if(buyerSessionId != null){
            log.info("No ! buyerSessionId is ... {}", buyerSessionId);
            simpMessagingTemplate.convertAndSendToUser(buyerSessionId, "topic/order", webSocketResponse);
        }
//        simpMessagingTemplate.convertAndSend("/topic/order", webSocketResponse);

        log.info("------------------------------------");
        log.info("--------------- END ---------------");

        return webSocketResponse;
    }

}
