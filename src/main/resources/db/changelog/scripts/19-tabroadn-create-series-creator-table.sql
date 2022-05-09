CREATE TABLE series_creator (
    series_id INT,
    person_id INT,
    role VARCHAR(15),
    PRIMARY KEY (series_id, person_id),
    FOREIGN KEY (series_id) REFERENCES series(id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);
