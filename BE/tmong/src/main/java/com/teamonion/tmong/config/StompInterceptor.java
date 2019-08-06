package com.teamonion.tmong.config;

import com.google.common.net.HttpHeaders;
import com.teamonion.tmong.security.JwtComponent;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

import java.util.HashMap;
import java.util.Map;

public class StompInterceptor implements ChannelInterceptor {

    @Autowired
    JwtComponent jwtComponent;

    private static Map<String, String> processingSessions = new HashMap<>();

    private static final Logger log = LoggerFactory.getLogger(WebSocketHandshakeInterceptor.class);

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor header = StompHeaderAccessor.wrap(message);
        String authorization = header.getFirstNativeHeader(HttpHeaders.AUTHORIZATION);

        log.info("=========================================");
        log.info("============ StompInterceptor ===========");
        log.info("================ preSend ================");
        if(authorization != null){
//            log.info("authorization ... : {}", authorization );
            log.info("getSessionId ... : {}", header.getSessionId());

            log.info("getSubscriptionId ... : {}", header.getSubscriptionId());

            String jwt = authorization.substring("Bearer" .length()).trim();
            String memberId = (String) Jwts.parser()
                    .setSigningKey("secret")
                    .parseClaimsJws(jwt)
                    .getBody()
                    .get("memberId");

            log.info("memberId ... : {}", memberId);

            processingSessions.put(memberId, header.getSessionId());
        }

        return message;
    }

    @Override
    public void postSend(Message<?> message, MessageChannel channel, boolean sent) {

    }

    public static Map<String, String> getProcessingSessions(){
        log.info("processingSessions Size : {} " , processingSessions.size());
        for( String key : processingSessions.keySet() ){
            log.info( "키 : {}, 값 : {}", key, processingSessions.get(key));
        }
        return processingSessions;
    }
}
