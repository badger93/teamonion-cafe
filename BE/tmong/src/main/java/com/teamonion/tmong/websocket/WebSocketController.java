package com.teamonion.tmong.websocket;

import com.teamonion.tmong.authorization.CheckJwt;
import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.exception.OrdersExceptionType;
import com.teamonion.tmong.order.Orders;
import com.teamonion.tmong.order.OrdersRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private static final Logger log = LoggerFactory.getLogger(WebSocketController.class);

    private final OrdersRepository ordersRepository;

    private final SimpMessagingTemplate simpMessagingTemplate;

    @CheckJwt
    @MessageMapping("/api/orders/update")
    public void update(@Payload OrdersUpdateRequest ordersUpdateRequest) {
        WebSocketResponse webSocketResponse;

        webSocketResponse = updateOrder(ordersUpdateRequest);
        processSendMessage(webSocketResponse);
    }

    private void processSendMessage(WebSocketResponse webSocketResponse) {
        // 주문자
        String buyerSessionId = ConnectedSession.get(webSocketResponse.getBuyerId());
        if (buyerSessionId != null) {
            log.info("buyerSessionId exist ... {}", buyerSessionId);
            SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
            headerAccessor.setSessionId(buyerSessionId);
            headerAccessor.setLeaveMutable(true);
            simpMessagingTemplate.convertAndSendToUser(buyerSessionId, "/queue/orders/update",
                    webSocketResponse, headerAccessor.getMessageHeaders());
        }

        // 관리자
        simpMessagingTemplate.convertAndSend("/topic/orders/update", webSocketResponse);
    }

    @Transactional
    public WebSocketResponse updateOrder(OrdersUpdateRequest ordersUpdateRequest) {
        try {
            if (ordersUpdateRequest.getId() == null) {
                throw new RuntimeException("주문 번호 정보가 올바르지 않습니다");
            }

            if (ordersUpdateRequest.getBuyerId() == null) {
                throw new RuntimeException("주문자 정보가 올바르지 않습니다");
            }

            Orders orders = ordersRepository.findById(ordersUpdateRequest.getId())
                    .orElseThrow(() -> new GlobalException(OrdersExceptionType.ORDER_NOT_FOUND));

            if (ordersUpdateRequest.isPaid()) {
                orders.pay();
            }
            if (ordersUpdateRequest.isMade()) {
                orders.make();
            }
            if (ordersUpdateRequest.isPickup()) {
                orders.pick();
            }

            WebSocketResponse webSocketResponse = new WebSocketResponse(ordersRepository.save(orders));

            Long count = ordersRepository.countByBuyerIdAndPickupFalse(orders.getBuyer().getId());

            if (count == 0) {
                webSocketResponse.setLast(true);
            }

            return webSocketResponse;
        } catch (GlobalException e) {
            return ordersUpdateRequest.toEntity(false, e.getErrorMessage());
        } catch (RuntimeException e) {
            return ordersUpdateRequest.toEntity(false, e.getMessage());
        }

    }

}
