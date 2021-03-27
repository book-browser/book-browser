CREATE TABLE person (
    id INT NOT NULL,
    full_name VARCHAR(150),
    PRIMARY KEY (id)
);

CREATE TABLE creator (
    book_id INT NOT NULL,
    person_id INT NOT NULL,
    role VARCHAR(15),
    PRIMARY KEY (book_id, person_id),
    FOREIGN KEY (book_id) REFERENCES book(id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);
