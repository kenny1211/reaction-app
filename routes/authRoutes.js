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
  // inside URL contains code, passport handles code to create user profile
  app.get('/auth/google/callback', passport.authenticate('google'));

  // test if auth flow works be sending back user info
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

