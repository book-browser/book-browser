package com.tabroadn.bookbrowser.repository;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Arrays;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.tabroadn.bookbrowser.exception.ImageConversionFailureException;
import com.tabroadn.bookbrowser.exception.ImageUploadFailureException;

import liquibase.util.file.FilenameUtils;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ImageRepository {
  @Value("${config.aws.s3.bucket-name:book-browser-bucket}")
  private String bucketName;

  @Autowired
  private AmazonS3 s3client;

  @Autowired
  private Environment environment;

  public String createImage(String base64String) {
    byte[] decodedBytes = decodeBase64(base64String);

    try {
      InputStream fis = new ByteArrayInputStream(decodedBytes);

      String filename = UUID.randomUUID().toString();

      ObjectMetadata metadata = new ObjectMetadata();
      metadata.setContentLength(decodedBytes.length);
      metadata.setContentType("image/jpg");
      if (Arrays.asList(environment.getActiveProfiles()).contains("local")) {
        metadata.setCacheControl("public, no-cache");
      } else {
        metadata.setCacheControl("public max-age=86400");
      }

      log.info("Uploading image with filename {} to S3 bucket {}", filename, bucketName);
      s3client.putObject(bucketName, filename, fis, metadata);
      s3client.setObjectAcl(bucketName, filename, CannedAccessControlList.PublicRead);

      return s3client.getUrl(bucketName, filename).toString();
    } catch (Exception e) {
      throw new ImageUploadFailureException("Unable upload image to aws", e);
    }
  }

  public void updateImage(String path, String base64String) {
    byte[] decodedBytes = decodeBase64(base64String);

    try {
      URL url = new URL(path);

      InputStream fis = new ByteArrayInputStream(decodedBytes);

      String filename = FilenameUtils.getName(url.getPath());

      ObjectMetadata metadata = new ObjectMetadata();
      metadata.setContentLength(decodedBytes.length);
      metadata.setContentType("image/jpg");
      if (Arrays.asList(environment.getActiveProfiles()).contains("local")) {
        metadata.setCacheControl("public, no-cache");
      } else {
        metadata.setCacheControl("public max-age=86400");
      }

      log.info("Replacing image with filename {} to S3 bucket {}", filename, bucketName);
      s3client.putObject(bucketName, filename, fis, metadata);
      s3client.setObjectAcl(bucketName, filename, CannedAccessControlList.PublicRead);
    } catch (Exception e) {
      throw new ImageUploadFailureException("Unable upload image to aws", e);
    }
  }

  public void deleteImage(String path) {
    try {
      URL url = new URL(path);
      String filename = url.getFile();
      s3client.deleteObject(bucketName, filename);
    } catch (Exception e) {
      throw new ImageUploadFailureException("Unable delete image from aws", e);
    }
  }

  private byte[] decodeBase64(String base64String) {
    try {
      return Base64.getDecoder().decode(base64String);
    } catch (IllegalArgumentException e) {
      throw new ImageConversionFailureException("Unable read image with invalid base64 scheme", e);
    }
  }
}
