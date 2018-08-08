DROP DATABASE local_voter_db;
CREATE DATABASE local_voter_db;

\c local_voter_db

DROP TABLE IF EXISTS polling_station;

CREATE TABLE polling_station
(
  id SERIAL PRIMARY KEY NOT NULL,
  address TEXT NOT NULL
);