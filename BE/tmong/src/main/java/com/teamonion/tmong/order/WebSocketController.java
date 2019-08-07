package com.teamonion.tmong.order;

import com.teamonion.tmong.config.StompInterceptor;
import com.teamonion.tmong.security.CheckJwt;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private static final Logger log = LoggerFactory.getLogger(WebSocketController.class);

    private final OrdersService ordersService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    @CheckJwt
    @MessageMapping("/api/orders/update")
    public void updateOrder(@Payload OrdersUpdateRequest ordersUpdateRequest) {
        log.info("------------------------------------");
        log.info("------------ updateOrder -----------");
        WebSocketResponse webSocketResponse = ordersService.updateOrder(ordersUpdateRequest);

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

        // 관리자
        simpMessagingTemplate.convertAndSend("/topic/orders/update", webSocketResponse);
        log.info("--------------- END ---------------");
    }

}
