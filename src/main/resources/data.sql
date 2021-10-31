INSERT INTO user (id, username, email, password, enabled)
  values (
    0,
    'admin',
    'bookbrowser.local@gmail.com',
    '$2a$10$xrHlCjjR/BHUY/UbD.LNA.9uRgy62uWN5UK2Bo9eH4oiYfmLo35NC',
    1);

INSERT INTO authority (username, role)
  values ('admin', 'ROLE_USER');

INSERT INTO person(id, full_name)
  values (1, 'Cedric Caballes');

INSERT INTO person(id, full_name)
  values (2, 'Niki Smith');

INSERT INTO person(id, full_name)
  values (3, 'Ariel Slamet Ries');

INSERT INTO person(id, full_name)
  values (4, 'Kat Leyh');

INSERT INTO person(id, full_name)
  values (5, 'Emma Steinkellner');

INSERT INTO person(id, full_name)
  values (6, 'Jen Wang');

INSERT INTO person(id, full_name)
  values (7, 'Cory Doctorow');

INSERT INTO person(id, full_name)
  values (8, 'Noelle Stevenson');

INSERT INTO person(id, full_name)
  values (9, 'Vera Brosgol');

INSERT INTO person(id, full_name)
  values (10, 'Bryan Lee O''Malley');

INSERT INTO person(id, full_name)
  values (11, 'Nathan Fairbairn');

INSERT INTO person(id, full_name)
  values (12, 'Kerascoët');

INSERT INTO person(id, full_name)
  values (13, 'Hubert');

INSERT INTO person(id, full_name)
  values (14, 'Fabien Vehlmann');

INSERT INTO person(id, full_name)
  values (15, 'Helge Dascher');

INSERT INTO person(id, full_name)
  values (16, 'Jennifer Muro');

INSERT INTO person(id, full_name)
  values (17, 'Thomas Krajewski');

INSERT INTO person(id, full_name)
  values (18, 'Gretel Lusky');

INSERT INTO person(id, full_name)
  values (19, 'Debbie Tung');

INSERT INTO person(id, full_name)
  values (20, 'Laurie Halse Anderson');

INSERT INTO person(id, full_name)
  values (21, 'Leila del Duca');

INSERT INTO person(id, full_name)
  values (22, 'Scott McCloud');

INSERT INTO person(id, full_name)
  values (23, 'Tillie Wallen');

INSERT INTO book(id, title, description, thumbnail, publish_date)
  values (1, 'The Witch''s Throne', 'Once every ten years, a random girl awakens as a witch with immeasurable power that is destined to destroy the world. To prevent this calamity from happening, four sacred tournaments are held one year prior to her birth to train and select a party of heroes strong enough to slay her. 99 years have passed since the first witch was born and felled, and the next cycle of tournaments are soon to begin. Follow Agni, a young alchemist with a penchant for explosives and revelry as she gathers her own party of wannabe heroes to participate in the tournaments and uncover the mystery behind the witch''s true origins.', FILE_READ('classpath:/images/the-witchs-throne.jpg'), '2017-08-27');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (1, 1, 'ISSUE', 1, '2017-08-27');

INSERT INTO book_genre VALUES(1, 2);

INSERT INTO book_link VALUES (1, 'https://tapas.io/series/thewitchsthrone', 'Tapas');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (2, 'The Deep & Dark Blue', FILE_READ('classpath:/images/deep-and-dark-blue.jpg'), '2020-01-07');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (2, 2, 'VOLUME', 1, '2020-01-07');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (3, 'Witchy', FILE_READ('classpath:/images/witchy.jpg'), '2019-09-17');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (3, 3, 'VOLUME', 1, '2020-01-07');
  
INSERT INTO book(id, title, thumbnail, publish_date)
  values (4, 'Cry Wolf Girl', FILE_READ('classpath:/images/cry-wolf-girl.jpg'), '2019-09-01');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (4, 4, 'VOLUME', 1, '2019-09-01');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (5, 'Snapdragon', FILE_READ('classpath:/images/snapdragon.jpg'), '2020-02-04');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (5, 5, 'VOLUME', 1, '2020-02-04');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (6, 'The Okay Witch', FILE_READ('classpath:/images/the-okay-witch.jpg'), '2019-09-03');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (6, 6, 'VOLUME', 1, '2019-09-03');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (7, 'The Prince and the Dressmaker', FILE_READ('classpath:/images/the-prince-and-the-dressmaker.jpg'), '2018-02-13');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (7, 7, 'VOLUME', 1, '2018-02-13');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (8, 'In Real Life', FILE_READ('classpath:/images/in-real-life.jpg'), '2014-10-14');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (8, 8, 'VOLUME', 1, '2014-10-14');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (9, 'Nimona', FILE_READ('classpath:/images/nimona.jpg'), '2015-05-12');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (9, 9, 'VOLUME', 1, '2015-05-12');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (10, 'Anya''s Ghost', FILE_READ('classpath:/images/anyas-ghost.jpg'), '2011-06-07');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (10, 10, 'VOLUME', 1, '2011-06-07');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (11, 'Seconds', FILE_READ('classpath:/images/seconds.jpg'), '2014-07-15');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (11, 11, 'VOLUME', 1, '2014-07-15');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (12, 'Beauty', FILE_READ('classpath:/images/beauty.jpg'), '2014-10-01');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (12, 12, 'VOLUME', 1, '2014-10-01');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (13, 'Beautiful Darkness', FILE_READ('classpath:/images/beautiful-darkness.jpg'), '2014-02-25');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (13, 13, 'VOLUME', 1, '2014-02-25');

INSERT INTO book(id, title, thumbnail, publish_date, description)
  values (14, 'Primer', FILE_READ('classpath:/images/primer.jpg'), '2020-06-23', 'Ashley Rayburn is an upbeat girl with a decidedly downbeat past. Her father is a known criminal who once used Ashley to help him elude justice, and in his attempt to escape, a life was taken. He now sits in federal prison, but still casts a shadow over Ashley''s life. In the meantime, Ashley has bounced from foster home to foster home and represents a real challenge to the social workers who try to help her--not because she''s inherently bad, but because trouble always seems to find her.\nAshley''s latest set of presumably short-term foster parents are Kitch and Yuka Nolan. Like Ashley, Kitch happens to be an artist. Yuka, on the other hand, is a geneticist working for a very high-level tech company, one that''s contracted out to work for the government and the military. And it''s Yuka''s latest top secret project that has her very concerned. Developed for the military, it''s a set of body paints that, when applied to the wearer, grant them a wide range of special powers. Fearful that this invention will be misused, Yuka sneaks the set of paints home, substituting a dummy suitcase with an ordinary set of paints in their place.\nFrom here, signals get crossed. Ashley comes home from school one day with her new friend Luke and, thinking that the Nolans have purchased a surprise gift for her upcoming birthday, finds the set of paints. Being an artist, Ashley naturally assumes these are for her. It isn''t long before she realizes that she''s stumbled upon something much bigger and a lot more dangerous. Although she uses her newly discovered powers for good, it''s not long before the military becomes wise to what happened to their secret weapon. And this spells big trouble not only for Ashley, but for her newfound family and friends as well.');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (14, 14, 'VOLUME', 1, '2020-06-23');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (15, 'Happily Ever After & Everything In Between', FILE_READ('classpath:/images/happily-ever-after.jpg'), '2020-06-02');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (15, 15, 'VOLUME', 1, '2020-06-02');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (16, 'Wonder Woman: Tempest Tossed', FILE_READ('classpath:/images/wonder-woman-tempest-tossed.jpg'), '2020-06-02');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (16, 16, 'VOLUME', 1, '2020-06-02');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (17, 'Understanding Comics: The Invisible Art', FILE_READ('classpath:/images/understanding-comics-the-invisible-art.jpg'), '1993-01-01');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (17, 17, 'VOLUME', 1, '1993-01-01');

INSERT INTO book(id, title, thumbnail, publish_date)
  values (18, 'Spinning', FILE_READ('classpath:/images/spinning.jpg'), '2017-09-12');

INSERT INTO book_release(id, book_id, release_type, release_number, publish_date)
  values (18, 18, 'VOLUME', 1, '2017-09-12');

INSERT INTO creator(book_id, person_id)
  values (1, 1);

INSERT INTO creator(book_id, person_id)
  values (2, 2);

INSERT INTO creator(book_id, person_id)
  values (3, 3);

INSERT INTO creator(book_id, person_id)
  values (4, 3);

INSERT INTO creator(book_id, person_id)
  values (5, 4);

INSERT INTO creator(book_id, person_id)
  values (6, 5);

INSERT INTO creator(book_id, person_id)
  values (7, 6);

INSERT INTO creator(book_id, person_id)
  values (8, 7);

INSERT INTO creator(book_id, person_id, role)
  values (8, 6, 'ILLUSTRATOR');

INSERT INTO creator(book_id, person_id)
  values (9, 8);

INSERT INTO creator(book_id, person_id)
  values (10, 9);

INSERT INTO creator(book_id, person_id)
  values (11, 10);

INSERT INTO creator(book_id, person_id, role)
  values (11, 11, 'COLORIST');

INSERT INTO creator(book_id, person_id, role)
  values (12, 12, 'ILLUSTRATOR');

INSERT INTO creator(book_id, person_id)
  values (12, 13);
  
INSERT INTO creator(book_id, person_id)
  values (13, 12);

INSERT INTO creator(book_id, person_id, role)
  values (13, 14, 'ILLUSTRATOR');

INSERT INTO creator(book_id, person_id, role)
  values (13, 15, 'TRANSLATOR');

INSERT INTO creator(book_id, person_id, role)
  values (14, 16, 'AUTHOR');

INSERT INTO creator(book_id, person_id, role)
  values (14, 17, 'AUTHOR');

INSERT INTO creator(book_id, person_id, role)
  values (14, 18, 'ILLUSTRATOR');

INSERT INTO creator(book_id, person_id)
  values (15, 19);

INSERT INTO creator(book_id, person_id)
  values (16, 20);

INSERT INTO creator(book_id, person_id)
  values (16, 21);

INSERT INTO creator(book_id, person_id)
  values (17, 22);

INSERT INTO creator(book_id, person_id)
  values (18, 23);