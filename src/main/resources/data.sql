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

INSERT INTO book_browser.person(id, first_name, middle_name, last_name)
  values (3, 'Ariel', 'Slamet', 'Ries');

INSERT INTO book_browser.person(id, first_name,last_name)
  values (4, 'Kat', 'Leyh');

INSERT INTO book_browser.person(id, first_name,last_name)
  values (5, 'Emma', 'Steinkellner');

INSERT INTO book_browser.person(id, first_name,last_name)
  values (6, 'Jen', 'Wang');

INSERT INTO book_browser.person(id, first_name,last_name)
  values (7, 'Cory', 'Doctorow');

INSERT INTO book_browser.person(id, first_name,last_name)
  values (8, 'Noelle', 'Stevenson');

INSERT INTO book_browser.person(id, first_name,last_name)
  values (9, 'Vera', 'Brosgol');

INSERT INTO book_browser.person(id, first_name, middle_name, last_name)
  values (10, 'Bryan', 'Lee','O''Malley');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (11, 'Nathan', 'Fairbairn');

INSERT INTO book_browser.person(id, first_name)
  values (12, 'Kerascoët');

INSERT INTO book_browser.person(id, first_name)
  values (13, 'Hubert');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (14, 'Fabien', 'Vehlmann');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (15, 'Helge', 'Dascher');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (16, 'Jennifer', 'Muro');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (17, 'Thomas', 'Krajewski');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (18, 'Gretel', 'Lusky');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (19, 'Debbie', 'Tung');

INSERT INTO book_browser.person(id, first_name, middle_name, last_name)
  values (20, 'Laurie', 'Halse', 'Anderson');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (21, 'Leila', 'del Duca');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (22, 'Scott', 'McCloud');

INSERT INTO book_browser.person(id, first_name, last_name)
  values (23, 'Tillie', 'Wallen');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (1, 'The Witch''s Throne', FILE_READ('classpath:/images/the-witchs-throne.jpg'), '2017-08-27');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (2, 'The Deep & Dark Blue', FILE_READ('classpath:/images/deep-and-dark-blue.jpg'), '2020-01-07');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (3, 'Witchy', FILE_READ('classpath:/images/witchy.jpg'), '2019-09-17');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (4, 'Cry Wolf Girl', FILE_READ('classpath:/images/cry-wolf-girl.jpg'), '2019-09-01');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (5, 'Snapdragon', FILE_READ('classpath:/images/snapdragon.jpg'), '2020-02-04');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (6, 'The Okay Witch', FILE_READ('classpath:/images/the-okay-witch.jpg'), '2019-09-03');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (7, 'The Prince and the Dressmaker', FILE_READ('classpath:/images/the-prince-and-the-dressmaker.jpg'), '2018-02-13');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (8, 'In Real Life', FILE_READ('classpath:/images/in-real-life.jpg'), '2014-10-14');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (9, 'Nimona', FILE_READ('classpath:/images/nimona.jpg'), '2015-05-12');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (10, 'Anya''s Ghost', FILE_READ('classpath:/images/anyas-ghost.jpg'), '2011-06-07');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (11, 'Seconds', FILE_READ('classpath:/images/seconds.jpg'), '2014-07-15');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (12, 'Beauty', FILE_READ('classpath:/images/beauty.jpg'), '2014-10-01');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (13, 'Beautiful Darkness', FILE_READ('classpath:/images/beautiful-darkness.jpg'), '2014-02-25');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (14, 'Primer', FILE_READ('classpath:/images/primer.jpg'), '2020-06-23');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (15, 'Happily Ever After & Everything In Between', FILE_READ('classpath:/images/happily-ever-after.jpg'), '2020-06-02');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (16, 'Wonder Woman: Tempest Tossed', FILE_READ('classpath:/images/wonder-woman-tempest-tossed.jpg'), '2020-06-02');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (17, 'Understanding Comics: The Invisible Art', FILE_READ('classpath:/images/understanding-comics-the-invisible-art.jpg'), '1993-01-01');

INSERT INTO book_browser.book(id, title, thumbnail, publish_date)
  values (18, 'Spinning', FILE_READ('classpath:/images/spinning.jpg'), '2017-09-12');

INSERT INTO book_browser.author(book_id, person_id)
  values (1, 1);

INSERT INTO book_browser.author(book_id, person_id)
  values (2, 2);

INSERT INTO book_browser.author(book_id, person_id)
  values (3, 3);

INSERT INTO book_browser.author(book_id, person_id)
  values (4, 3);

INSERT INTO book_browser.author(book_id, person_id)
  values (5, 4);

INSERT INTO book_browser.author(book_id, person_id)
  values (6, 5);

INSERT INTO book_browser.author(book_id, person_id)
  values (7, 6);

INSERT INTO book_browser.author(book_id, person_id)
  values (8, 7);

INSERT INTO book_browser.author(book_id, person_id)
  values (8, 6);

INSERT INTO book_browser.author(book_id, person_id)
  values (9, 8);

INSERT INTO book_browser.author(book_id, person_id)
  values (10, 9);

INSERT INTO book_browser.author(book_id, person_id)
  values (11, 10);

INSERT INTO book_browser.author(book_id, person_id)
  values (11, 11);

INSERT INTO book_browser.author(book_id, person_id)
  values (12, 12);

INSERT INTO book_browser.author(book_id, person_id)
  values (12, 13);
  
INSERT INTO book_browser.author(book_id, person_id)
  values (13, 12);

INSERT INTO book_browser.author(book_id, person_id)
  values (13, 14);

INSERT INTO book_browser.author(book_id, person_id)
  values (13, 15);

INSERT INTO book_browser.author(book_id, person_id)
  values (14, 16);

INSERT INTO book_browser.author(book_id, person_id)
  values (14, 17);

INSERT INTO book_browser.author(book_id, person_id)
  values (14, 18);

INSERT INTO book_browser.author(book_id, person_id)
  values (15, 19);

INSERT INTO book_browser.author(book_id, person_id)
  values (16, 20);

INSERT INTO book_browser.author(book_id, person_id)
  values (16, 21);

INSERT INTO book_browser.author(book_id, person_id)
  values (17, 22);

INSERT INTO book_browser.author(book_id, person_id)
  values (18, 23);