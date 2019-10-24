// var Net = require('net');
var mysql = require('mysql');

const express = require('express');
const app = express();
app.listen(3030, () => console.log('listening at 3030'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))
app.post('/api', (request, response) => {
  console.log(request);
  response.json({
    status: 'yes',
  })
});
