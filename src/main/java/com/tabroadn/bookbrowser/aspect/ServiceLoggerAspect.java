package com.tabroadn.bookbrowser.aspect;

import java.util.Arrays;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class ServiceLoggerAspect {
  @Around("execution(public * *(..)) && within(com.tabroadn.bookbrowser.service..*)")
  private Object logAroundEveryPublicMethod(ProceedingJoinPoint pjp) throws Throwable {
    log.info("Service Call [{}]", pjp.getSignature());
    log.debug(
        "Service Call Arguments {}",
        Arrays.stream(pjp.getArgs()).map(Object::toString).collect(Collectors.toList()));
    return pjp.proceed();
  }
}
