package com.teamonion.tmong.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AuthorizationInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private JwtComponent jwtComponent;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        CheckJwt checkJwt = ((HandlerMethod) handler).getMethodAnnotation(CheckJwt.class);
        if (checkJwt == null || !checkJwt.handle()) {
            return true;
        }

        String authorization = request.getHeader("Authorization");
        if(authorization == null) {
            return false;
        }
        String jwt = authorization.substring("Bearer".length()).trim();

        jwtComponent.checkToken(jwt);
        return true;
    }
}
