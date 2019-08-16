package com.teamonion.tmong.config;

import com.teamonion.tmong.websocket.StompInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.concurrent.Executor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/teamonion")
                .setAllowedOrigins("*").withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompInterceptor());
        registration.taskExecutor(socketThreadPoolExecutor());
    }

    @Bean
    public StompInterceptor stompInterceptor() {
        return new StompInterceptor();
    }

    @Bean
    public ThreadPoolTaskExecutor socketThreadPoolExecutor() {
        ThreadPoolTaskExecutor socketThreadExecutor = new ThreadPoolTaskExecutor();
        socketThreadExecutor.setCorePoolSize(2);
        socketThreadExecutor.setMaxPoolSize(30);
        socketThreadExecutor.setQueueCapacity(15);
        return socketThreadExecutor;
    }
}

