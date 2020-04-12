CREATE TABLE book_browser.user (
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  enabled TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (email)
);

CREATE TABLE book_browser.authorities (
  email VARCHAR(50) NOT NULL,
  authority VARCHAR(50) NOT NULL,
  FOREIGN KEY (email) REFERENCES user(email)
);

INSERT INTO book_browser.user (email, password, enabled)
  values (
    'admin',
    '$2a$10$xrHlCjjR/BHUY/UbD.LNA.9uRgy62uWN5UK2Bo9eH4oiYfmLo35NC',
    1);
 
INSERT INTO book_browser.authorities (email, authority)
  values ('admin', 'ROLE_USER');