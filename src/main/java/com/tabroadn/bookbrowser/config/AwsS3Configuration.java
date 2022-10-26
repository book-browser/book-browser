package com.tabroadn.bookbrowser.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import lombok.Data;

@Data
@Configuration
public class AwsS3Configuration {
  @Value("${config.aws.region:us-east-1}")
  private String region;
  @Value("${config.aws.s3.url:http://127.0.0.1:4566}")
  private String s3EndpointUrl;
  @Value("${config.aws.s3.access-key:localstack}")
  private String accessKey;
  @Value("${config.aws.s3.secret-key:localstack}")
  private String secretKey;

  @Bean
  public AmazonS3 amazonS3() {
    return AmazonS3ClientBuilder.standard()
        .withCredentials(getCredentialsProvider())
        .withEndpointConfiguration(getEndpointConfiguration(s3EndpointUrl))
        .build();
  }

  private EndpointConfiguration getEndpointConfiguration(String url) {
    return new EndpointConfiguration(url, region);
  }

  private AWSStaticCredentialsProvider getCredentialsProvider() {
    return new AWSStaticCredentialsProvider(getBasicAWSCredentials());
  }

  private BasicAWSCredentials getBasicAWSCredentials() {
    return new BasicAWSCredentials(accessKey, secretKey);
  }
}
