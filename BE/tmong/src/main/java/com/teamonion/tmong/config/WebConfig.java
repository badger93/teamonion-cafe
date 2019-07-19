package com.teamonion.tmong.config;

import com.teamonion.tmong.security.AuthorizationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor());
    }

    @Bean
    public AuthorizationInterceptor jwtInterceptor() {
        return new AuthorizationInterceptor();
    }
}
