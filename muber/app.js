const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');

app.use(bodyParser.json());
routes(app);

module.exports = app;
