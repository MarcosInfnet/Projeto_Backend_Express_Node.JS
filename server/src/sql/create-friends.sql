drop table if exists friends;
       create table friends(
	id integer PRIMARY KEY AUTOINCREMENT,
	user_a integer not null references users(id) on delete cascade,
	user_b integer not null references users(id) on delete cascade
);