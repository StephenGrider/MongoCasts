const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Run this function whenever someone goes to
// localhost:3050/
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

module.exports = app;
