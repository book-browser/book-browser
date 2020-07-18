INSERT INTO book_browser.user (email, password, enabled)
  values (
    'admin',
    '$2a$10$xrHlCjjR/BHUY/UbD.LNA.9uRgy62uWN5UK2Bo9eH4oiYfmLo35NC',
    1);

INSERT INTO book_browser.authorities (email, authority)
  values ('admin', 'ROLE_USER');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (1, 'Cedric', 'Caballes');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (2, 'Niki', 'Smith');

INSERT INTO book_browser.book(id, title, thumbnail)
  values (1, 'The Witch''s Throne', FILE_READ('classpath:/the-witchs-throne.jpg'));

INSERT INTO book_browser.book(id, title, thumbnail)
  values (2, 'The Deep & Dark Blue', FILE_READ('classpath:/deep-and-dark-blue.jpg'));

INSERT INTO book_browser.author(book_id, person_id)
  values (1, 1);

INSERT INTO book_browser.author(book_id, person_id)
  values (2, 2);