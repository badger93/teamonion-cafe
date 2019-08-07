package com.teamonion.tmong.config;

import com.google.common.net.HttpHeaders;
import com.teamonion.tmong.security.JwtComponent;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

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
        StompHeaderAccessor header = StompHeaderAccessor.wrap(message);
        String authorization = header.getFirstNativeHeader(HttpHeaders.AUTHORIZATION);
        String destination = header.getDestination();
        String memberId = "";
        String jwt = "";

        log.info("=========================================");
        log.info("============ StompInterceptor ===========");
        log.info("================ preSend ================");

        log.info("getCommand ... : {}", header.getCommand().toString());
        log.info("getDestination ... : {}", header.getDestination());
        if (authorization != null) {
            log.info("getSessionId ... : {}", header.getSessionId());

            jwt = authorization.substring("Bearer".length()).trim();

            memberId = (String) Jwts.parser()
                    .setSigningKey("secret")
                    .parseClaimsJws(jwt)
                    .getBody()
                    .get("memberId");


            log.info("memberId ... : {}", memberId);
        }

        StompCommand command = Optional.ofNullable(header.getCommand()).orElseThrow(() -> new RuntimeException("command is null"));
        switch (command) {
            case CONNECT:
                log.info("CONNECT");
                processingSessions.put(memberId, header.getSessionId());

                break;
            case DISCONNECT:
                log.info("DISCONNECT");
                processingSessions.remove(memberId);

                break;
            case SEND:
                log.info("SEND");
                if (destination != null && destination.equals("/api/orders/update")) {
                    log.info("jwt ... {}", jwt);
//                    jwtComponent.checkToken(jwt);
//
//                    if (!jwtComponent.getClaimValueByToken("role").equals(MemberRole.ADMIN.toString())) {
//                        throw new HandleRuntimeException(GlobalExceptionType.UNAUTHORIZED);
//                    }
//                    log.info("jwtComponent ADMIN CHECK SUCCEED");
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
