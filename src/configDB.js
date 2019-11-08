var mysql = require('mysql');

const DB = "teacherboard.chrqjhfpa44g.us-east-2.rds.amazonaws.com"
// const DB = "localhost"
var connection = mysql.createConnection({
  host     : DB,
  user     : "admin1853",
  password : "CAMS3onfwm563$",
  port     : "3306"
});
connection.query("DROP DATABASE tb");
connection.query("CREATE DATABASE tb");
connection.query("USE tb");
connection.query("CREATE TABLE schools (id int unsigned AUTO_INCREMENT PRIMARY KEY, name varchar(20) NOT NULL, location Point)");
connection.query("CREATE TABLE users (id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(20) NOT NULL, email varchar(20) NOT NULL UNIQUE, password varchar(20) NOT NULL, school int unsigned, isAdminTeacher tinyint DEFAULT 0, constraint TS FOREIGN KEY (school) REFERENCES schools(id) )");
connection.query("CREATE TABLE lessons (id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, teacherID int unsigned NOT NULL, studentID int unsigned NOT NULL, room int DEFAULT 0, time datetime, duration tinyint, status tinyint, constraint LU FOREIGN KEY (studentID) REFERENCES users(id), constraint TU FOREIGN KEY (teacherID) REFERENCES users(id) )");
connection.query("CREATE TABLE schedules (id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, teacherID int unsigned NOT NULL, studentID int unsigned NOT NULL, timeStart smallInt NOT NULL, properties tinyint, constraint SCT FOREIGN KEY (teacherID) REFERENCES users(id), constraint SCS FOREIGN KEY (studentID) REFERENCES users(id))");
// Data
connection.query('INSERT INTO schools (name) values ("Test")');
connection.query('insert into users (name, email, password, school, isAdminTeacher) values ("Test Name", "a@", "tea", 1, 2)');
connection.query('insert into users (name, email, password, school, isAdminTeacher) values ("Name Test", "s@", "te", 1, 1)');
connection.query('insert into users (name, email, password, school, isAdminTeacher) values ("AB", "s1@", "te", 1, 0)');
connection.query('insert into users (name, email, password, school, isAdminTeacher) values ("DC", "s2@", "te", 1, 0)');
connection.query('insert into lessons (teacherID, studentID, room, time, duration, status) values (2, 3, 1, "2019-11-7 10:10:10", 45, 0)');
connection.query('insert into lessons (teacherID, studentID, room, time, duration, status) values (1, 3, 1, "2019-11-7 15:10:10", 45, 0)');
connection.query('insert into lessons (teacherID, studentID, room, time, duration, status) values (1, 4, 1, "2019-11-7 16:10:10", 45, 0)');

connection.end();
