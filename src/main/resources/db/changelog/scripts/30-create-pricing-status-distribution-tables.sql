create table pricing (
  id int auto_increment,
  name varchar(25) not null unique,
  PRIMARY KEY (id)
);

create table status (
  id int auto_increment,
  name varchar(25) not null unique,
  PRIMARY KEY (id)
);

create table distribution (
  id int auto_increment,
  name varchar(25) not null unique,
  PRIMARY KEY (id)
);

insert into pricing values (NULL, 'FREE');
insert into pricing values (null, 'PREMIUM');
insert into pricing values (null, 'FREMIUM');
insert into pricing values (null, 'SUBSCRIPTION');

insert into status values (null, 'ONGOING');
insert into status values (null, 'COMPLETED');
insert into status values (null, 'HIATUS');
insert into status values (null, 'CANCELLED');

insert into distribution values (null, 'DIGITAL');
insert into distribution values (null, 'PRINT');

alter table series drop column status;
alter table series add column status_id int, add foreign key (status_id) references status(id);

alter table series_publisher drop column cost_access;
alter table series_publisher add column pricing_id int, add foreign key (pricing_id) references pricing(id);
alter table series_publisher drop column completion;
alter table series_publisher add column status_id int, add foreign key (status_id) references status(id);
alter table series_publisher drop column distribution;
alter table series_publisher add column distribution_id int, add foreign key (distribution_id) references distribution(id);
