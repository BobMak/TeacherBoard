var mysql = require('mysql');

const DB = "teacherboard.chrqjhfpa44g.us-east-2.rds.amazonaws.com"
// const DB = "localhost"
const PORT = "3306"
const USER = "admin1853"
const PASSWORD = "CAMS3onfwm563$"

const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const app        = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use    (cors());
app.options('*', cors());
app.use    (bodyParser.json());
app.use    (bodyParser.urlencoded({ extended: true }));

query = async (q, f) => {
  var connection = await mysql.createConnection({
    host     : DB,
    user     : USER,
    password : PASSWORD,
    port     : PORT
  });
  await connection.query('USE tb');
  await connection.query(q, (err, data) => f(err, data) );
}

app.post('/addLesson', (req, res) => {
  console.log(req);
  query(`insert into lessons (teacherID, studentID, room, time, duration, status) values (${req.body.tid}, ${req.body.sid}, ${req.body.room}, "${req.body.time}", ${req.body.len}, 0)`, (err, data) => {
    if (err) { res.json({ status: false }) }
    else { res.json({ status: true }) }
  });
});

app.post('/addSchedule', (req, res) => {
  console.log(req);
  res.json({
    status: 'yes',
  })
});

app.post('/addTeacher', (req, res) => {
  console.log(req.body);
  query('SELECT isAdminTeacher FROM users WHERE email="'+req.body.email+'"', function (err, data) { 
    if (data.length===1 && data.isAdminTeacher==0) {
      query('UPDATE users SET isAdminTeacher=1 WHERE email="'+req.body.email+'"', function (err, data) {
        if (err) { res.json({ status: 1 }) }
        else     { res.json({ status: 0 }) }
      })
    }
    else {
      res.json({ status: 2 })
    }
  });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  query('SELECT id, isAdminTeacher FROM users WHERE email="'+req.body.login + '" and password="' + req.body.password+'"', function (err, data) { 
      if (err)                   { res.json( { status: 2,   data: -1 }) }
      else if (data.length == 1) { res.json( { status: 0,   data: data[0].isAdminTeacher, id: data[0].id }) }
      else                       { res.json( { status: 1,   data: -1 }) }
    });
});

app.post('/register', (req, res) => {
  console.log(req.body);
  query('SELECT * FROM users WHERE email="'+req.body.email+'"', function (err, data) {
    if (data.length===0) {
      query(`insert into users (name, email, password, isAdminTeacher) values ("${req.body.fullName}", "${req.body.email}", "${req.body.password}", 0)`, (err, da) => {
        res.json( { status: true })});
    }
    else {
      res.json( { status: false })
    }
  });
});

app.get('/teachers', (req, res) => {
  console.log('teachers');
  query('SELECT * FROM users WHERE isAdminTeacher=1 or isAdminTeacher=2', function (err, data) {
    res.json( { teachers: data.map( (p => { return { email: p.email, name: p.name, id: p.id }; })) } )
  });
});

app.get('/students', (req, res) => {
  console.log('students');
  query('SELECT * FROM users WHERE isAdminTeacher=0', function (err, data) {
    res.json( { students: data.map( (p => { return { email: p.email, name: p.name, id: p.id }; })) } )
  });
});

app.get('/getAllLessons', (req, res) => {
  console.log('getAllLessons');
  query('SELECT * FROM lessons', function (err, data) {
    res.json( { students: data.map( (p => { return { tid: p.teacherID, sid: p.studentID, time: p.time, len: p.duration, status: p.status }; })) } )
  });
});

app.post('/getUserLessons', (req, res) => {
  console.log('getUserLessons ', req.body);
  if ( "id" in req.body === false ) { res.json( {lessons: []} ) }
  query(`SELECT * FROM lessons WHERE teacherID=${req.body.id} or studentID=${req.body.id};`, function (err, data) {
    console.log(err, data);
    if (data.length!=0) {
      res.json( { lessons: data.map( (p => { return { tid: p.teacherID, sid: p.studentID, room: p.room, time: p.time, len: p.duration, status: p.status }; })) } )
    }
    else { res.json( {lessons: []} ) }
  });
});

app.post('/getRoomTime', (req, res) => {
  console.log('getRoomTime');
  query(`SELECT time, duration status FROM lessons WHERE room=${req.body.room};`, function (err, data) {
    console.log(data);
    res.json( { lessons: data.map( (p => { return { tid: p.teacherID, sid: p.studentID, room: p.room, time: p.time, len: p.duration, status: p.status }; })) } )
  });
});

app.get('/schedules', (req, res) => {
  console.log('schedules');
  query(`SELECT time, duration status FROM lessons WHERE room=${req.room};`, function (err, data) {
    console.log(data);
    res.json( { lessons: data.map( (p => { return { tid: p.teacherID, sid: p.studentID, room: p.room, time: p.time, len: p.duration, status: p.status }; })) } )
  });
})
