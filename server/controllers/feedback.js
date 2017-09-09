const url = require('url');
const request = require('request');
const isBadWord = require('../helpers/isBadWord');

module.exports = {
  /**
   * make request to slack API
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} server response
   */
  getFeedback(req, res) {
    const userInput = req.body.text;
    if (isBadWord(userInput) === true) {
      return res.status(400)
        .send({
          text: 'Sorry your feedback is not in ASK format, make some corrections and resend'
        });
    }
    const channel = userInput.match(/(@\w+\b)/g);

    if (!channel) {
      return res.status(400)
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
      if (error) {
        return res.status(400).send({ text: 'Feedback not sent successfully' });
      }
      return res.status(200).send({ text: 'Feedback sent successfully' });
    });
  },

  /**
   * home page response
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} server response
   */
  getHomePage(req, res) {
    return res.status(200).send({ text: 'Hello , i am ask-feedback-bot and am here to help you' });
  }
};
