create table book_link (
  id INT AUTO_INCREMENT,
  book_id INT,
  url VARCHAR(100),
  description VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (book_id) REFERENCES book(id)
);
