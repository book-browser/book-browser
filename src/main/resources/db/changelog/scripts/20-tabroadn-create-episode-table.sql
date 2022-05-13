CREATE TABLE episode (
  id INT AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(2000),
  thumbnail MEDIUMBLOB NOT NULL,
  release_date DATE,
  series_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (series_id) REFERENCES series(id)
);
