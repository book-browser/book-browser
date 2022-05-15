alter table person rename TO party;

alter table creator rename To book_creator;

alter table book_creator rename column person_id TO party_id;

alter table series_creator rename column person_id TO party_id;
