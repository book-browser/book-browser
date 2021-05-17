CREATE TABLE verification_token (
    id INT AUTO_INCREMENT,
    token VARCHAR(36) NOT NULL,
    user_id INT NOT NULL,
    expiration_date DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);