package com.tabroadn.bookbrowser.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RequestLoggingFilterConfig {
  @Bean
  public RequestLoggingFilter logFilter() {
    return new RequestLoggingFilter();
  }
}
