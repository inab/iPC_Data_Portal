const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('custom-env').env('production')

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', cors(), function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT);
console.log(`Production server ready on port ${process.env.PORT}`)
