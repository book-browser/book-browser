CREATE TABLE book_browser.book (
    id INT NOT NULL,
    title VARCHAR(50),
    description VARCHAR(250),
    thumbnail BLOB,
    pageViews INT,
    uploadDate DATE,
    PRIMARY KEY (id)
);
