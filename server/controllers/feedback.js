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
      return res.send('Sorry your feedback is not in ASK format, make some corrections and resend');
    }
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
      if (error) {
        return res.send('Feedback not sent successfully');
      }
      return res.send('Feedback sent successfully');
    });
  },

  /**
   * home page response
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} server response
   */
  getHomePage(req, res) {
    res.send('It works!');
  }
};
