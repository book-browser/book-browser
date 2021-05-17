CREATE TABLE book (
    id INT AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(2000),
    thumbnail BLOB,
    page_views INT,
    publish_date DATE,
    PRIMARY KEY (id)
);
