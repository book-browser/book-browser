start transaction;
  alter table series add column status varchar(20);
commit;
