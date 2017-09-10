const controller = require('../controllers/feedback');


module.exports = (route) => {
  route.get('/', controller.getHomePage);
  route.post('/feedback', controller.getFeedback);
  route.post('/message-action', controller.handleMessageAction);
};
