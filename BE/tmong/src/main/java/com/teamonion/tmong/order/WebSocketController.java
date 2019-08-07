package com.teamonion.tmong.order;

import com.teamonion.tmong.config.StompInterceptor;
import com.teamonion.tmong.security.CheckJwt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    private static final Logger log = LoggerFactory.getLogger(WebSocketController.class);

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @CheckJwt
    @MessageMapping("/api/orders/update")
    @SendTo("/topic/orders/update")
    public WebSocketResponse updateOrder(@Payload OrdersUpdateRequest ordersUpdateRequest,
                                         SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        log.info("------------------------------------");
        log.info("------------ updateOrder -----------");
        WebSocketResponse webSocketResponse = ordersService.updateOrder(ordersUpdateRequest);

        // 상태바꾼 관리자
//        String adminSessionId = simpMessageHeaderAccessor.getSessionId();
//        log.info("admin SessionId is ... {}", adminSessionId);
        // TODO : 관리자 url 수정 topic/orders/update

        // 상태의 주인공
        String buyerSessionId = StompInterceptor.getProcessingSessions().get(webSocketResponse.getBuyerId());
        if (buyerSessionId != null) {
            log.info("buyerSessionId exist ... {}", buyerSessionId);
            SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
            headerAccessor.setSessionId(buyerSessionId);
            headerAccessor.setLeaveMutable(true);
            simpMessagingTemplate.convertAndSendToUser(buyerSessionId, "/queue/orders/update", webSocketResponse,
                    headerAccessor.getMessageHeaders());
        }

        simpMessagingTemplate.convertAndSend("/topic/orders/update", webSocketResponse);
        log.info("------------------------------------");
        log.info("--------------- END ---------------");

        return webSocketResponse;
    }

}
