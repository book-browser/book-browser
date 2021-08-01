CREATE TABLE book_release (
    id INT AUTO_INCREMENT,
    book_id INT NOT NULL,
    description VARCHAR(250),
    release_type VARCHAR(10) NOT NULL,
    release_number INT NOT NULL,
    publish_date DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (book_id) REFERENCES book(id)
);
