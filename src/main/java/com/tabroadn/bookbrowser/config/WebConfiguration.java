package com.tabroadn.bookbrowser.config;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.DeserializationConfig;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.tabroadn.bookbrowser.util.EnumDeserializer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
  @Autowired
  private StringToGenreConverter stringToGenreConverter;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/**/*", "*")
        .addResourceLocations("classpath:/app/")
        .resourceChain(true)
        .addResolver(
            new PathResourceResolver() {
              @Override
              protected Resource getResource(String resourcePath, Resource location)
                  throws IOException {
                Resource requestedResource = location.createRelative(resourcePath);
                if (requestedResource.exists() && requestedResource.isReadable()) {
                  return requestedResource;
                } else if (resourcePath.startsWith("api")) {
                  return null;
                }
                return new ClassPathResource("/app/index.html");
              }
            });
  }

  @Override
  public void addFormatters(FormatterRegistry registry) {
    DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
    registrar.setUseIsoFormat(true);
    registrar.registerFormatters(registry);
    registry.addConverter(stringToGenreConverter);

    registry.addConverterFactory(new ConverterFactory<String, Enum>() {
      @Override
      public <T extends Enum> Converter<String, T> getConverter(Class<T> targetType) {
        return source -> {
          if (source.isBlank()) {
            return null;
          }
          if (NumberUtils.isCreatable(source)) {
            try {
              return (T) targetType.getMethod("valueOfId", Long.class).invoke(null, Long.parseLong(source));
            } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException
                | NoSuchMethodException
                | SecurityException e) {
            }
          }
          return (T) Enum.valueOf(targetType, source.toUpperCase().replaceAll("-", "_"));
        };
      }
    });
  }

  @Bean
  public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
    SimpleModule module = new SimpleModule();
    module.setDeserializerModifier(new BeanDeserializerModifier() {
      @Override
      public JsonDeserializer<Enum> modifyEnumDeserializer(DeserializationConfig config,
          final JavaType type,
          BeanDescription beanDesc,
          final JsonDeserializer<?> deserializer) {
        return new EnumDeserializer((Class<Enum<?>>) type.getRawClass());
      }
    });
    return builder -> builder.modulesToInstall(module);
  }
}
