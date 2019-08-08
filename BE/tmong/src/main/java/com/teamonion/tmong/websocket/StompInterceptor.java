package com.teamonion.tmong.websocket;

import com.google.common.net.HttpHeaders;
import com.teamonion.tmong.security.JwtComponent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class StompInterceptor implements ChannelInterceptor {

    @Autowired
    private JwtComponent jwtComponent;

    private static Map<String, String> processingSessions = new HashMap<>();

    private static final Logger log = LoggerFactory.getLogger(StompInterceptor.class);

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String authorization = accessor.getFirstNativeHeader(HttpHeaders.AUTHORIZATION);
        String destination = accessor.getDestination();
        String memberId = "";
        String jwt = "";


        log.info("=========================================");
        log.info("============ StompInterceptor ===========");
        log.info("================ preSend ================");
        log.info("getDestination ... : {}", accessor.getDestination());
        log.info("getSessionId ... : {}", accessor.getSessionId());

        if (authorization != null) {
            jwt = authorization.substring("Bearer".length()).trim();
            log.info("jwt ... {}", jwt);
            jwtComponent.checkToken(jwt);
            memberId = jwtComponent.getClaimValueByTokenForWebSocket(jwt, JwtComponent.MEMBER_ID);

            log.info("memberId ... : {}", memberId);
        }

        StompCommand command = Optional.ofNullable(accessor.getCommand())
                .orElseThrow(() -> new RuntimeException("Command is Null ..."));

        switch (command) {
            case CONNECT:
                log.info("CONNECT");
                processingSessions.put(memberId, accessor.getSessionId());

                break;
            case DISCONNECT:
                log.info("DISCONNECT");
                processingSessions.remove(memberId);

                break;
            case SEND:
                log.info("SEND");
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

    public static Map<String, String> getProcessingSessions() {
        log.info("processingSessions Size : {} ", processingSessions.size());
        for (String key : processingSessions.keySet()) {
            log.info("키 : {}, 값 : {}", key, processingSessions.get(key));
        }
        return processingSessions;
    }


}
