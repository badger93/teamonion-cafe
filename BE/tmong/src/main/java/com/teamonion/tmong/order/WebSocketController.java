package com.teamonion.tmong.order;

import com.teamonion.tmong.config.StompInterceptor;
import com.teamonion.tmong.security.CheckJwt;
import com.teamonion.tmong.validate.UpdateOrderValidator;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private static final Logger log = LoggerFactory.getLogger(WebSocketController.class);

    private final OrdersService ordersService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final UpdateOrderValidator updateOrderValidator;

    @CheckJwt
    @MessageMapping("/api/orders/update")
    public void updateOrder(@Payload OrdersUpdateRequest ordersUpdateRequest) {
//        updateOrderValidator.validate(ordersUpdateRequest, bindingResult);

        WebSocketResponse webSocketResponse;

        boolean valid = true;
        String errorMessage;

//        if(bindingResult.hasErrors()){
//            log.info("-------- VALID ERROR OCCUR ---------");
//            FieldError fieldError = bindingResult.getFieldError();
//            valid = fieldError == null || fieldError.isBindingFailure();
//            errorMessage = fieldError != null ? fieldError.getDefaultMessage() : "";
//            log.info("valid ... {}", valid);
//            log.info("errorMessage ... {}", errorMessage);
//
//            webSocketResponse = ordersUpdateRequest.toEntity(valid, errorMessage);
//            processSendMessage(webSocketResponse);
//            log.info("-------- VALID ERROR END ---------");
//            return;
//        }

        webSocketResponse = ordersService.updateOrder(ordersUpdateRequest);
        processSendMessage(webSocketResponse);

        log.info("--------------- END ---------------");
    }

    private void processSendMessage(WebSocketResponse webSocketResponse) {
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
    }

}
