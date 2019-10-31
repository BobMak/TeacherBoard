// var Net = require('net');
var mysql = require('mysql');

const DB = "teacherboard.chrqjhfpa44g.us-east-2.rds.amazonaws.com"
// const DB = "localhost"
const PORT = "3306"
const USER = "admin1853"
const PASSWORD = "CAMS3onfwm563$"

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
  var connection = mysql.createConnection({
    host     : DB,
    user     : USER,
    password : PASSWORD,
    port     : PORT
  });

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }

    console.log('Connected to database.');
  });

  connection.end();
});

app.post('/teacher', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
});

app.post('/student', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
});

app.post('/lesson', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
});

app.post('/schedule', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
});

app.post('/login', (request, response) => {
  console.log(request.body);
  var connection = mysql.createConnection({
    host     : DB,
    user     : USER,
    password : PASSWORD,
    port     : PORT
  });
  connection.query('USE tb');
  // connection.query('select isAdminTeacher from users where email="a@" and password="tea"', function(err, data) {
  connection.query('SELECT isAdminTeacher FROM users WHERE email="'+request.body.login + '" and password="' + request.body.password+'"', function(err, data) {
    if (err) {
      console.log('query failed:', err);
      response.json( { status: 'dbFailed', data: null })
    }
    else if (data.length == 1) {
      response.json( { status: 'correct', data: data[0].isAdminTeacher })
    }
    else {
      response.json( { status: 'incorrect', data: null })
    }
    connection.end();
  });
});

app.get('/teachers', (request, response) => {
  console.log("teachers");
  response.json({
    status: 'yes',
  })
});

app.get('/students', (request, response) => {
  console.log('students');
  // var students = JSON.stringify({ 'st1': 10, 'st2': 11, 'st3': 12 })
  response.json([
    { 'st1': 10 },
    { 'st2': 11 },
    { 'st3': 12 }
  ])
});

app.get('/lessons', (req, res) => {
  console.log('lessons');
  // res.setHeader('Content-Type', 'application/json');
  res.json( { "status": "ok" } )
});

app.get('/schedules', (request, response) => {
  console.log("schedules");
  response.json({
    status: 'yes',
  })
});
