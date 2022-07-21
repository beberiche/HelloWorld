package com.ssafy;

import org.kurento.client.KurentoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import java.nio.charset.StandardCharsets;

@SpringBootApplication
public class GroupCallApplication {
	public static void main(String[] args) {
        SpringApplication.run(GroupCallApplication.class, args);
    }

//    @Bean
//    public HttpMessageConverter<String> responseBodyConverter() {
//        return new StringHttpMessageConverter(StandardCharsets.UTF_8);
//    }

//    @Bean
//    public CharacterEncodingFilter characterEncodingFilter() {
//        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
//        characterEncodingFilter.setEncoding("UTF-8");
//        characterEncodingFilter.setForceEncoding(true);
//        return characterEncodingFilter;
//    }
//    @Bean
//    public KurentoClient kurentoClient(){
//        return KurentoClient.create();
//    }
//    @Bean
//    public ServletServerContainerFactoryBean createServletServerContainerFactoryBean() {
//        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
//        container.setMaxTextMessageBufferSize(32768);
//        return container;
//    }

}
