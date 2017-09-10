const request = require('request');
const url = require('url');
const badWords = require('./bad-words.json');

module.exports = {
  /**
   * checks if feedback string contains bad words
   * @param {string} userInput - feedback text input
   * @return {boolean} server response
   */
  isBadWord: (userInput) => {
    let result = false;
    badWords.forEach((word) => {
      if (userInput.match(word)) {
        result = true;
      }
    });
    return result;
  },

  /**
   * sends askify feedback
   * @param {object} query - feedback request object
   * @param {Object} res - response object
   * @param {boolean} [sendResponse = true] - optional send response
   * @return {object} response object
   */
  sendAskifyFeedback: (query, res, sendResponse = true) => {
    const message = url.format({
      pathname: 'https://slack.com/api/chat.postMessage',
      query,
    });

    if (sendResponse) {
      request(message, (error, response, body) => {
        if (error) {
          return res.status(400).send({
            text: 'Feedback not sent successfully'
          });
        }
        return res.status(200).send({
          text: 'Feedback sent successfully'
        });
      });
    } else {
      request(message);
    }
  },

  /**
   * sends feedback response from recipient
   * @param {string} responseURL - slack response url
   * @param {Object} JSONmessage - message in JSON format
   * @return {void}
   */
  sendAskifyFeedbackResponse: (responseURL, JSONmessage) => {
    const postOptions = {
      uri: responseURL,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      json: JSONmessage
    };
    request(postOptions);
  },

  /**
   * handles api response
   * @param {number} statusCode - response status code
   * @param {string} message - response message
   * @param {object} res - response object
   * @return {object} response object
   */
  handleResponse: (statusCode, message, res) => res.status(statusCode).send({
    text: message,
  }),
};
