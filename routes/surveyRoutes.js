const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//could require directly out of mongoose model class bc of possible issues when running tests
const Survey = mongoose.model('surveys');
module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // create survey instance
    const survey = new Survey({
      title,
      subject,
      body,
      //recipients: take emails which is an array of strings and turn into array of objects
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // send email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      // save survey to mongo
      await survey.save();
      // deduct credit and store into relevant user
      req.user.credits -= 1;
      const user = await req.user.save();
      // send back user model with update number of credits for header to catch
      res.send(user);
    } catch (err) {
      res.status(422);
    }
  });
};
