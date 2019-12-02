CREATE DATABASE notify;

\c notify

DROP TABLE IF EXISTS course CASCADE;

CREATE TABLE course (
  subject_code text,
  course_number varchar(30),
  section_number varchar(30),
  phone_number bigint,
  restricted_seat boolean,
  general_seat boolean,
  PRIMARY KEY (phone_number, subject_code, course_number, section_number)
);  