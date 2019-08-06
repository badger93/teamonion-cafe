package com.teamonion.tmong.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

@Component
public class WebSocketSessionHandler extends TextWebSocketHandler {

    private Map<String, String> processingSessions = new HashMap<>();

    private static final Logger log = LoggerFactory.getLogger(WebSocketSessionHandler.class);

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        String authorization1 = session.getHandshakeHeaders().getFirst("Authorization");

        log.info("=========================================");
        log.info("========= WebSocketSessionHandler =======");
        log.info("======= afterConnectionEstablished =====");
        log.info("=========================================");
        log.info("========= getHandshakeHeaders() ==========");
        log.info("======== Authorization getFirst =========");
        log.info("authorization1 : {} ", authorization1);
        log.info("========== Authorization get =============");
        for(String s : session.getHandshakeHeaders().get("Authorization")) {
            log.info("authorization : {} ", s);
        }
        log.info("=========================================");

        log.info("============== just get() ==============");
        log.info("", session.getAttributes().get("Authorization"));
        log.info("=========================================");
        log.info("afterconnection.. memberId : {}", session.getAttributes().get("memberId"));
        log.info("afterconnection.. sessionId : {}", session.getId());
        log.info("=========================================");
        log.info("================ END ===================");

        processingSessions.put((String)session.getAttributes().get("memberId"), session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        log.info("=========================================");
        log.info("============ handleTextMessage ==========");
        log.info("=========================================");
        log.info("session ID : {}", session.getId());
        log.info("받은 메세지 : {}", message.getPayload());
        log.info("=========================================");
        log.info("============== just get() ==============");
        log.info("", session.getAttributes().get("Authorization"));

        log.info("=========================================");
        session.sendMessage(new TextMessage("echo: " + message.getPayload()));

        log.info("================ END ===================");
    }
}
