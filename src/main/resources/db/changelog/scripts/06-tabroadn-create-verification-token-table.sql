CREATE TABLE book_browser.verification_token (
    id INT AUTO_INCREMENT,
    token VARCHAR(36) NOT NULL,
    user_id INT NOT NULL,
    expiration_date DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES book_browser.user(id)
);