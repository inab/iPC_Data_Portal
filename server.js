const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', cors(), function(req, res) {
//app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(5000);
