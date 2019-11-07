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

app.post('/teacher', (req, res) => {
  console.log(req);
  res.json({
    status: 'yes',
  })
});

app.post('/student', (req, res) => {
  console.log(req);
  res.json({
    status: 'yes',
  })
});

app.post('/lesson', (req, res) => {
  console.log(req);
  res.json({
    status: 'yes',
  })
});

app.post('/schedule', (req, res) => {
  console.log(req);
  res.json({
    status: 'yes',
  })
});

app.post('/addTeacher', (req, res) => {
  console.log(req.body);
  query('SELECT isAdminTeacher FROM users WHERE email="'+req.body.email+'"', function (err, data) { 
    console.log('res: ', err, data)
    if (data.length===1 && data.isAdminTeacher==0) {
      query('UPDATE users SET isAdminTeacher=1 WHERE email="'+req.body.email+'"', function (err, data) {
        if (err) { console.log(err); res.json({ status: 1 }) }
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
  query('SELECT isAdminTeacher FROM users WHERE email="'+req.body.login + '" and password="' + req.body.password+'"', function (err, data) { 
    console.log('res: ', err, data)
      if (err) {
        console.log('query failed:', err);
        res.json( { status: 'dbFailed', data: null })
      }
      else if (data.length == 1) {
        res.json( { status: 'correct', data: data[0].isAdminTeacher })
      }
      else {
        res.json( { status: 'incorrect', data: null })
      }
    });
});

app.post('/register', (req, res) => {
  console.log(req.body);
  query('SELECT * FROM users WHERE email="'+req.body.email+'"', function (err, data) {
    console.log(data.length)
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
    console.log('teachers: ', data)
    res.json( { teachers: data.map( (res => { return { email: res.email, name: res.name }; })) } )
  });
});

app.get('/students', (req, res) => {
  console.log('students');
  query('SELECT * FROM users WHERE isAdminTeacher=0', function (err, data) {
    console.log('students: ', data)
    res.json( { students: data.map( (res => { return { email: res.email, name: res.name }; })) } )
  });
});

app.get('/lessons', (req, res) => {
  console.log('lessons');
  // res.setHeader('Content-Type', 'application/json');
  res.json( { "status": "ok" } )
});

app.get('/schedules', (req, res) => {
  console.log("schedules");
  res.json({
    status: 'yes',
  })
});
