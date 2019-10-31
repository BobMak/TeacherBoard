import mysql.connector

# Connect to server
cnx = mysql.connector.connect(
    host="127.0.0.1",
    port=3306,
    user="admin1853",
    password="CAMS3onfwm563$")

# Get a cursor
cur = cnx.cursor(buffered=True)

# Reset the DB
cur.execute("DROP DATABASE tb")
cur.execute("CREATE DATABASE tb")
cur.execute("USE tb")
# Set up Schema
# Schools table
cur.execute("CREATE TABLE schools (id int unsigned AUTO_INCREMENT PRIMARY KEY, name varchar(20) NOT NULL, location Point)")
# Teachers and Students table
cur.execute("CREATE TABLE users (id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(20) NOT NULL, email varchar(20) NOT NULL UNIQUE, password varchar(20) NOT NULL, school int unsigned, isAdminTeacher tinyint, constraint TS FOREIGN KEY (school) REFERENCES schools(id) )")
# Lessons table
cur.execute("CREATE TABLE lessons (id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, teacherID int unsigned NOT NULL, studentID int unsigned, time datetime, duration tinyint, status tinyint, constraint LU FOREIGN KEY (studentID) REFERENCES users(id), constraint TU FOREIGN KEY (teacherID) REFERENCES users(id) )")
# Schedules table
cur.execute("CREATE TABLE schedules (id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, teacherID int unsigned NOT NULL, studentID int unsigned NOT NULL, timeStart smallInt NOT NULL, properties tinyint, constraint SCT FOREIGN KEY (teacherID) REFERENCES users(id), constraint SCS FOREIGN KEY (studentID) REFERENCES users(id))")

# Add Test Data
cur.execute('INSERT INTO schools (name) values ("Test")')
cur.execute('insert into users (name, email, password, school, isAdminTeacher) values ("Test Name", "a@", "tea", 1, 2)')
cur.execute('insert into users (name, email, password, school, isAdminTeacher) values ("Name Test", "s@", "te", 1, 1)')
cur.execute('insert into users (name, email, password, school, isAdminTeacher) values ("TestName", "s1@", "te", 1, 1)')
cur.execute('insert into users (name, email, password, school, isAdminTeacher) values ("TestName", "s2@", "te", 1, 1)')
# Close connection
cnx.close()
