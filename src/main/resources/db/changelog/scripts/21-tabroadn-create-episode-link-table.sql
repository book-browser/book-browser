create table episode_link (
  episode_id INT,
  url VARCHAR(100),
  description VARCHAR(50),
  PRIMARY KEY (episode_id, url),
  FOREIGN KEY (episode_id) REFERENCES episode(id)
);
