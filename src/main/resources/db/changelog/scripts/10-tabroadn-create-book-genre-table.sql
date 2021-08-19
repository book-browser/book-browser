create table book_genre (
  book_id INT,
  genre_id INT,
  PRIMARY KEY (book_id, genre_id),
  FOREIGN KEY (book_id) REFERENCES book(id),
  FOREIGN KEY (genre_id) REFERENCES genre(id)
);
