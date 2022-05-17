create table series_publisher (
    series_id int,
    party_id int,
    url varchar(100),
    primary key (series_id, party_id),
    foreign key (series_id) references series(id),
    foreign key (party_id) references party(id)
);
