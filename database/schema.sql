CREATE DATABASE notify;

\c notify

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE course (
  subject_code text,
  course_number smallint,
  section_number smallint,
  phone_number integer,
  restricted_seat boolean,
  general_seat boolean,
  PRIMARY KEY (phone_number, subject_code, course_number, section_number)
);  