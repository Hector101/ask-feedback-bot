const controller = require('../controllers/feedback');


module.export = (route) => {
  route.post('/feedback', controller.getFeedback);
  route.get('/', controller.getHomePage);
};
