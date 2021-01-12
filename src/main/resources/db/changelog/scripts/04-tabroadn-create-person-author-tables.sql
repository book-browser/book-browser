CREATE TABLE book_browser.person (
    id INT NOT NULL,
    full_name VARCHAR(150),
    PRIMARY KEY (id)
);

CREATE TABLE book_browser.creator (
    book_id INT NOT NULL,
    person_id INT NOT NULL,
    role VARCHAR(15),
    PRIMARY KEY (book_id, person_id),
    FOREIGN KEY (book_id) REFERENCES book_browser.book(id),
    FOREIGN KEY (person_id) REFERENCES book_browser.person(id)
);
