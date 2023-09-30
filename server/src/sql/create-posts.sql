drop table if exists posts;
       create table posts(
	id integer PRIMARY KEY AUTOINCREMENT,
	content text not null,
	created_at timestamp default current_timestamp
);