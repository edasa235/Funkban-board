CREATE TABLE labels (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(50) not null unique
);