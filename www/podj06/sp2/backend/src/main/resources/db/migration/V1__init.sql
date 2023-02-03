CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

CREATE TABLE stop_group (
    cis_id integer not null,
    avg_lat float not null,
    avg_lon float not null,
    full_name varchar(255),
    name varchar(255),
    primary key (cis_id)
);