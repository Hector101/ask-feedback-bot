const url = require('url');
const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('It works!');
});

app.post('/feedback', (req, res) => {
  const channel = req.body.text.match(/(@\w+\b)/g)[0];

  const sendMessage = url.format({
    pathname: 'https://slack.com/api/chat.postMessage',
    query: {
      token: process.env.SLACK_TOKEN,
      channel,
      text: req.body.text
    }
  });

  request(sendMessage, (error, response, body) => {
    if (!error) {
      res.send('Feedback sent');
    }
  });
});

module.exports = app;
