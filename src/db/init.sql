create table BudgetMonth (
  id bigint not null primary key,
  created_at timestamp default now(),
  Month text,
  Year smallint
);

create table Budget (
  id bigint not null primary key,
  created_at timestamp default now(),
  Name text,
  Max smallint,
  BudgetMonth bigint references BudgetMonth (id)
);

create table Expenses (
  id bigint not null primary key,
  created_at timestamp default now(),
  Name text,
  Description text,
  BudgetItem bigint references Budget (id),
  Amt smallint
);

