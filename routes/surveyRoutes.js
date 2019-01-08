const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

//could require directly out of mongoose model class bc of possible issues when running tests
const Survey = mongoose.model('surveys');
module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      //recipients: take emails which is an array of strings and turn into array of objects
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
