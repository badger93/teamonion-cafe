package com.teamonion.tmong.websocket;

import com.google.common.net.HttpHeaders;
import com.teamonion.tmong.authorization.JwtComponent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

import java.util.Optional;

public class StompInterceptor implements ChannelInterceptor {

    @Autowired
    private JwtComponent jwtComponent;

    private ConnectedSession connectedSession = new ConnectedSession();

    private static final Logger log = LoggerFactory.getLogger(StompInterceptor.class);

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String authorization = accessor.getFirstNativeHeader(HttpHeaders.AUTHORIZATION);
        String destination = accessor.getDestination();
        String memberId = "";
        String jwt = "";

        if (authorization != null) {
            jwt = authorization.substring("Bearer".length()).trim();
            jwtComponent.checkTokenValidation(jwt);
            memberId = jwtComponent.getClaimValueByTokenForWebSocket(jwt, JwtComponent.MEMBER_ID);
        }

        StompCommand command = Optional.ofNullable(accessor.getCommand())
                .orElseThrow(() -> new RuntimeException("Command is Null ..."));
        log.debug(command.toString());

        switch (command) {
            case CONNECT:
                connectedSession.add(memberId, accessor.getSessionId());

                break;
            case DISCONNECT:
                connectedSession.remove(memberId);

                break;
            case SEND:
                // 관리자 - 주문 상태 변경
                if (destination != null && destination.equals("/api/orders/update")) {
                    jwtComponent.checkAdminForWebSocket(jwt);
                    log.info("jwt checkAdmin Success ...");
                }
                break;

            default:
                break;
        }

        return message;
    }

}
