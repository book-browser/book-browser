CREATE TABLE book_browser.person (
    id INT NOT NULL,
    first_name VARCHAR(50),
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE book_browser.author (
    book_id INT NOT NULL,
    person_id INT NOT NULL,
    PRIMARY KEY (book_id, person_id),
    FOREIGN KEY (book_id) REFERENCES book_browser.book(id),
    FOREIGN KEY (person_id) REFERENCES book_browser.person(id)
);
