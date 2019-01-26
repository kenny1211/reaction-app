const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

//could require directly out of mongoose model class bc of possible issues when running tests
const Survey = mongoose.model('surveys');
module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // iterate over sendgrid events received, extract url, and parse out surveyId and choice
    const p = new Path('/api/surveys/:surveyId/:choice');

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        // match will be { surveyId, choice } or null
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      // compact is a lodash function that removes undefined elements
      .compact()
      // uniqBy is a lodash function that removes duplicates
      .uniqBy('email', 'surveyId')
      .value();
    console.log(events);

    // respond to sendgrid to end request, otherwise sendgrid will continue to reping
    res.send({});
  });

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
