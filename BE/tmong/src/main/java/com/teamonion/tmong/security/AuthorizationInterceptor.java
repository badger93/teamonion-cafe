package com.teamonion.tmong.security;

import com.teamonion.tmong.component.JwtComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AuthorizationInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private JwtComponent jwtComponent;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String authorization = request.getHeader("Authorization");
        if(authorization == null) {
            return false;
        }

        String jwt = authorization.substring("Bearer".length()).trim();

        jwtComponent.checkToken(jwt);
        return true;
    }
}
