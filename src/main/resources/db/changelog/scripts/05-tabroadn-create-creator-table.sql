CREATE TABLE creator (
    book_id INT,
    person_id INT,
    role VARCHAR(15),
    PRIMARY KEY (book_id, person_id),
    FOREIGN KEY (book_id) REFERENCES book(id),
    FOREIGN KEY (person_id) REFERENCES person(id)
);
