CREATE TABLE series (
  id INT AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(2000),
  banner MEDIUMBLOB,
  PRIMARY KEY (id)
);

alter table book
add column series_id INT;

alter table book
add foreign key (series_id) references series(id); 