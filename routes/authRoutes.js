const passport = require('passport');

module.exports = app => {
  // route handler that uses passport to kick off authentication flow, which knows to use google strategy from first argument in passport.authenticate
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // route handler which hits after the google strat performs callbackURL argument
  // inside URL contains code, passport handles code to create/get user profile
  // after done w successful passport auth call redirect
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
     }
  );

  // route handler to log user out
  app.get('/api/logout', (req, res) => {
    req.logout(); //function attached automatically by passport
    // redirect user to root route
    res.redirect('/');
  });

  // test if auth flow works be sending back user info
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

