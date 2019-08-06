package com.teamonion.tmong.order;

import com.teamonion.tmong.config.StompInterceptor;
import com.teamonion.tmong.security.CheckJwt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
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
    @SendTo("/queue/orders/update")
    public WebSocketResponse updateOrder(@Payload OrdersUpdateRequest ordersUpdateRequest,
                                         SimpMessageHeaderAccessor simpMessageHeaderAccessor) {

        log.info("------------------------------------");
        log.info("------------ updateOrder -----------");
        log.info("payload ordersupdaterequest : {}", ordersUpdateRequest);
        log.info("------------------------------------");
        WebSocketResponse webSocketResponse = ordersService.updateOrder(ordersUpdateRequest);

        // 상태바꾼 관리자
        String adminSessionId = simpMessageHeaderAccessor.getSessionId();
        log.info("admin SessionId is ... {}", adminSessionId);
        simpMessagingTemplate.convertAndSendToUser(adminSessionId, "/queue/orders/update" , webSocketResponse);
        simpMessagingTemplate.convertAndSend("/queue/orders/update/" + adminSessionId , webSocketResponse);

        // 상태의 주인공
        String buyerSessionId = StompInterceptor.getProcessingSessions().get(webSocketResponse.getBuyerId());
        log.info("buyerSessionId is NULL??????????");
        if(buyerSessionId != null){
            log.info("No ! buyerSessionId is ... {}", buyerSessionId);
            simpMessagingTemplate.convertAndSendToUser(buyerSessionId, "/queue/orders/update", webSocketResponse);
        }

        simpMessagingTemplate.convertAndSendToUser(StompInterceptor.getProcessingSessions().get("sefide"), "/queue/orders/update" , webSocketResponse);
        simpMessagingTemplate.convertAndSend("/queue/orders/update/" + StompInterceptor.getProcessingSessions().get("sefide") , webSocketResponse);
//        simpMessagingTemplate.convertAndSend("/topic/order", webSocketResponse);

        log.info("simpMessageHeaderAccessor");
        log.info("Principal .... getUser() : {}", simpMessageHeaderAccessor.getUser());
        log.info("getSubscriptionId .... : {}", simpMessageHeaderAccessor.getSubscriptionId());
        log.info("getMessageType .... : {}", simpMessageHeaderAccessor.getMessageType());
        log.info("getDestination .... : {}", simpMessageHeaderAccessor.getDestination());
        log.info("getSessionAttributes .... : {}", simpMessageHeaderAccessor.getSessionAttributes());
        log.info("getSessionAttributes Authorization .... : {}", simpMessageHeaderAccessor.getSessionAttributes().get("Authorization"));
        log.info("------------------------------------");
        log.info("------------------------------------");

        log.info("Principal user info");
//        log.info("Principal .... getName() : {}", user.getName());

        log.info("------------------------------------");
        log.info("------------------------------------");
        log.info("------------------------------------");
        log.info("--------------- END ---------------");

        return webSocketResponse;
    }

}
