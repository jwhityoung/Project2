DROP DATABASE IF EXISTS Project2Dev;
CREATE DATABASE Project2Dev;

CREATE TABLE `place` (
  `name` VARCHAR( 255 ) NOT NULL,
  `description` VARCHAR( 255) NOT NULL,
  `cordinates` Int( 11 ) AUTO_INCREMENT NOT NULL,

  PRIMARY KEY ('name')
);

CREATE TABLE `review` (
  `title` VARCHAR( 255 ) NOT NULL,
  `body` VARCHAR( 255) NOT NULL,
  `rating` Int( 11 ) AUTO_INCREMENT NOT NULL,

  PRIMARY KEY ('title')
);

CREATE TABLE `user` (
  `email` VARCHAR( 255 ) NOT NULL,
  `password` VARCHAR( 255) NOT NULL

  PRIMARY KEY ('email')
);