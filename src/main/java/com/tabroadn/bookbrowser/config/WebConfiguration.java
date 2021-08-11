package com.tabroadn.bookbrowser.config;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@EnableWebMvc
@Configuration
public class WebConfiguration implements WebMvcConfigurer {	
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**/*", "*")
                .addResourceLocations("classpath:/app/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                    	Resource requestedResource = location.createRelative(resourcePath);
                    	if (requestedResource.exists() && requestedResource.isReadable()) {
                    		return requestedResource;
                    	} else if(resourcePath.startsWith("api")) {
                    		return null;
                    	}
                        return  new ClassPathResource("/app/index.html");
                    }
                });
    }
}
