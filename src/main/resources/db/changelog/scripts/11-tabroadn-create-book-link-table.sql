create table book_link (
  book_id INT,
  url VARCHAR(100),
  description VARCHAR(50),
  PRIMARY KEY (book_id, url),
  FOREIGN KEY (book_id) REFERENCES book(id)
);
