const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  app.post('/api/drivers', DriversController.create);
};
