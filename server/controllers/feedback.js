const Helper = require('../helpers/Helper');

module.exports = {
  /**
   * make request to slack API
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} server response
   */
  getFeedback(req, res) {
    if (!req.body.text) {
      return Helper.handleResponse(
        200,
        'Please specify your feedback in the correct format',
        res
      );
    }
    const userInput = req.body.text;
    if (Helper.isBadWord(userInput) === true) {
      return Helper.handleResponse(
        200,
        'Sorry your feedback is not in ASK format, make some corrections and resend',
        res
      );
    }

    const channel = userInput.match(/(@\w+\b)/g);

    if (!channel) {
      return Helper.handleResponse(
        200,
        'Please specify the recipient of this feedback.',
        res
      );
    }

    /**
     * define attachment. This is how the message will be formatted on slack
     */
    const attachments = [
      {
        fallback: 'Do you think this feedback is askified?',
        text: '_Do you think this feedback is askified?_',
        callback_id: 'ask_response',
        attachment_type: 'default',
        mrkdwn_in: ['text'],
        actions: [
          {
            name: req.body.user_name,
            text: 'Yes',
            type: 'button',
            value: 'yes',
            style: 'success'
          },
          {
            name: req.body.user_name,
            text: 'No',
            type: 'button',
            value: 'no',
            style: 'danger'
          }
        ]
      }
    ];

    const query = {
      token: process.env.SLACK_TOKEN,
      channel: channel[0],
      text: userInput,
      attachments: JSON.stringify(attachments),
    };

    return Helper.sendAskifyFeedback(query, res);
  },

  /**
   * home page response
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} server response
   */
  getHomePage(req, res) {
    return Helper.handleResponse(
      200,
      'Hello , i am askify and am here to help you',
      res
    );
  },

  /**
   * feedback survey response
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} server response
   */
  handleMessageAction(req, res) {
    if (!req.body.payload) {
      return Helper.handleResponse(403, 'Access forbidden', res);
    }

    res.status(200).end();

    const payloadJSON = JSON.parse(req.body.payload);
    if (payloadJSON.token !== process.env.VERIFICATION_TOKEN) {
      return Helper.handleResponse(403, 'Access forbidden', res);
    }

    const message = {
      text: payloadJSON.original_message.text,
      replace_original: true
    };

    Helper.sendAskifyFeedbackResponse(payloadJSON.response_url, message);

    const text = payloadJSON.actions[0].value === 'no'
      ? `*_${payloadJSON.user.name}_* doesn't think this feedback is in the ASK format. Please be EPIC and always send ASK feedback`
      : 'Your feedback has been received';

    const query = {
      token: process.env.SLACK_TOKEN,
      channel: `@${payloadJSON.actions[0].name}`,
      text: `*Feedback Response: * ${text}`,
    };

    Helper.sendAskifyFeedback(query, res, false);
  },
};
