// var Net = require('net');
var mysql = require('mysql');

const DB = "teacherboard.chrqjhfpa44g.us-east-2.rds.amazonaws.com"
// const DB = "localhost"
const PORT = "3306"
const USER = "admin1853"
const PASSWORD = "CAMS3onfwm563$"

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at ${port}`));
// app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://52.15.223.49"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });
  connection.end();
  response.json( { status: 'success' })
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
