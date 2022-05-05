create table series_genre (
  series_id INT,
  genre_id INT,
  PRIMARY KEY (series_id, genre_id),
  FOREIGN KEY (series_id) REFERENCES series(id),
  FOREIGN KEY (genre_id) REFERENCES genre(id)
);
