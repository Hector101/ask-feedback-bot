const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/feedback');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);


module.exports = app;
