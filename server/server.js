const url = require('url');
const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const isBadWord = require('./helpers/isBadWord.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('It works!');
});

app.post('/feedback', (req, res) => {
  const userInput = req.body.text;
  if (isBadWord(userInput) === true) {
    res.send('Sorry your feedback is not in ASK format');
  } else {
    const channel = userInput.match(/(@\w+\b)/g)[0];

    const sendMessage = url.format({
      pathname: 'https://slack.com/api/chat.postMessage',
      query: {
        token: process.env.SLACK_TOKEN,
        channel,
        text: userInput
      }
    });

    request(sendMessage, (error, response, body) => {
      if (!error) {
        res.send('Feedback sent');
      }
    });
  }
});

module.exports = app;
