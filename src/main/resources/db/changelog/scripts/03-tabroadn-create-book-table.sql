CREATE TABLE book_browser.book (
    id INT NOT NULL,
    title VARCHAR(50),
    description VARCHAR(250),
    thumbnail BLOB,
    page_views INT,
    publish_date DATE,
    PRIMARY KEY (id)
);
