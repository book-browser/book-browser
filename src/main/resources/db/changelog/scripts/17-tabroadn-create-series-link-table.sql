create table series_link (
  series_id INT,
  url VARCHAR(100),
  description VARCHAR(50),
  PRIMARY KEY (series_id, url),
  FOREIGN KEY (series_id) REFERENCES series(id)
);
