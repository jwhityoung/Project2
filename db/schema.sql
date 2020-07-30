DROP DATABASE IF EXISTS Project2Dev;
CREATE DATABASE Project2Dev;

CREATE TABLE `place` (
    `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR( 255 ) NOT NULL,
  `description` VARCHAR( 255) NOT NULL,
  `cordinates` Int( 11 ) AUTO_INCREMENT NOT NULL,

  PRIMARY KEY ('id')
);

CREATE TABLE `review` (
    `id` INT AUTO_INCREMENT NOT NULL,
  `title` VARCHAR( 255 ) NOT NULL,
  `body` VARCHAR( 255) NOT NULL,
  `rating` Int( 11 ) NOT NULL,

  PRIMARY KEY ('id')
);

CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT NOT NULL,
  `email` VARCHAR( 255 ) NOT NULL,
  `password` VARCHAR( 255) NOT NULL

  PRIMARY KEY ('id')
);