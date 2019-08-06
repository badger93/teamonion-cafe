package com.teamonion.tmong.config;

import com.teamonion.tmong.security.JwtComponent;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class WebSocketHandshakeInterceptor implements HandshakeInterceptor {

    private static final Logger log = LoggerFactory.getLogger(WebSocketHandshakeInterceptor.class);

    @Autowired
    JwtComponent jwtComponent;

    @Override
    public boolean beforeHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Map<String, Object> map) throws Exception {
        // TODO : jwt 토큰 검사

//        Optional<HttpServletRequest> request = Optional
//                .ofNullable(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest());
//        String authorization = request.orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.REQUEST_IS_NULL))
//                .getHeader("Authorization");
//        String jwt = authorization.substring("Bearer".length()).trim();

//        return (String) Jwts.parser()
//                .setSigningKey(secret)
//                .parseClaimsJws(jwt)
//                .getBody()
//                .get(claimName);

//        for (String s : headers.keySet()) {
//            log.info("beforeHandshake.. header : {}", s);
//        }
//
//
//        String authorization = headers.get("Authorization").get(0);
//        if (serverHttpRequest instanceof ServletServerHttpRequest) {
//
//
//            ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) serverHttpRequest;
//            map.put("Authori", "foo");
//        }

        log.info("===================================================");
        log.info("============== WebSocketHandshakeInterceptor ======");
        log.info("===================================================");
        String authorization1 = ((ServletServerHttpRequest)serverHttpRequest).getServletRequest().getParameter("Authorization");
        String authorization2 = serverHttpRequest.getHeaders().getFirst("Authorization");
        String authorization3 = ((ServletServerHttpRequest) (serverHttpRequest)).getServletRequest().getHeader("Authorization");

        log.info("beforehandshake..authorization1 : {}", authorization1);
        log.info("beforehandshake..authorization2 : {}", authorization2);
        log.info("beforehandshake..authorization3 : {}", authorization3);

        log.info("===================================================");
        log.info("===================================================");
//        String jwt = authorization.substring("Bearer" .length()).trim();
//        String memberId = (String) Jwts.parser()
//                .setSigningKey("secret")
//                .parseClaimsJws(jwt)
//                .getBody()
//                .get("memberId");

//        map.put("memberId", memberId);


        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Exception e) {

    }
}
