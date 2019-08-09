package com.teamonion.tmong.security;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.member.MemberRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;


public class AuthorizationInterceptor extends HandlerInterceptorAdapter {
    private static final Logger log = LoggerFactory.getLogger(AuthorizationInterceptor.class);
    private static final String AUTHORIZATION_TYPE = "Bearer";

    @Autowired
    private JwtComponent jwtComponent;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // like swagger
        if(!(handler instanceof HandlerMethod)) {
            log.debug("handler : {}", handler);
            return true;
        }

        CheckJwt checkJwt = ((HandlerMethod) handler).getMethodAnnotation(CheckJwt.class);
        if (checkJwt == null || !checkJwt.handle()) {
            return true;
        }

        String authorization = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .orElseThrow(() -> new GlobalException(GlobalExceptionType.UNAUTHORIZED));
        String jwt = authorization.substring(AUTHORIZATION_TYPE.length()).trim();

        jwtComponent.checkValidToken(jwt);
        if(checkJwt.role().equals(MemberRole.ADMIN)) {
            jwtComponent.checkAdmin();
        }
        return true;
    }
}
