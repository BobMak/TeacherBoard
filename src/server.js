// var Net = require('net');
// var mysql = require('mysql');

const express = require('express');
const app = express();
app.listen(3001, () => console.log('listening at 3001'));
// app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))
app.post('/api', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
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

app.get('/teachers', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
});

app.get('/students', (request, response) => {
  console.log(request);
  response.json({
    status: 'students',
    body: 'twet'
  })
});

app.get('/lessons', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
});

app.get('/schedules', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
});
