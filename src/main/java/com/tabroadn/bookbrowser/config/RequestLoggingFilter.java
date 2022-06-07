package com.tabroadn.bookbrowser.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.filter.AbstractRequestLoggingFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RequestLoggingFilter extends AbstractRequestLoggingFilter {

  public RequestLoggingFilter() {
    super();
    setIncludeQueryString(true);
    setBeforeMessagePrefix("Request [");
    setMaxPayloadLength(10000);
    setIncludeHeaders(false);
  }

  @Override
  protected void beforeRequest(HttpServletRequest request, String message) {
    log.info(message);
  }

  @Override
  protected void afterRequest(HttpServletRequest request, String message) {
  }
}
