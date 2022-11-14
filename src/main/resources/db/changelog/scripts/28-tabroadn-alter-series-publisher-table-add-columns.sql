start transaction;
alter table series_publisher add column episode_count int;
alter table series_publisher add column cost_access varchar(20);
alter table series_publisher add column cost int;
alter table series_publisher add column completion varchar(20);
alter table series_publisher add column distribution varchar(20);
alter table series_publisher add column preview boolean;
commit;
