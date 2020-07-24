CREATE TABLE book_browser.release (
    id INT NOT NULL,
    book_id INT NOT NULL,
    description VARCHAR(250),
    release_type VARCHAR(10) NOT NULL,
    release_number INT NOT NULL,
    publish_date DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (book_id) REFERENCES book_browser.book(id)
);
