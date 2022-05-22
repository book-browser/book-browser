alter table person rename TO party;

alter table creator rename to book_creator;

alter table book_creator rename column person_id to party_id;

alter table series_creator rename column person_id to party_id;
