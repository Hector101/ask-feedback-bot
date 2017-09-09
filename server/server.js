const url = require('url');
const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const isBadWord = require('./helpers/isBadWord.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res
    .send({ text: 'Hello , i am ask-feedback-bot and am here to help you' });
});

app.post('/feedback', (req, res) => {
  const userInput = req.body.text;
  if (isBadWord(userInput) === true) {
    return res.send({ text: 'Sorry your feedback is not in ASK format' });
  }
  const channel = userInput.match(/(@\w+\b)/g);
  if (!channel) {
    return res
      .send({ text: 'Please specify the recipient of this feedback.' });
  }

  const sendMessage = url.format({
    pathname: 'https://slack.com/api/chat.postMessage',
    query: {
      token: process.env.SLACK_TOKEN,
      channel: channel[0],
      text: userInput
    }
  });

  request(sendMessage, (error, response, body) => {
    if (!error) {
      res.send({ text: 'Feedback sent' });
    }
  });
});

module.exports = app;
