const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// let passport new to use google strategy in the auth process
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  accessToken => {
    console.log(accessToken);
  }
)
);

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

// app.listen: express telling node (the runtime) what port to listen to
// process.env: look at the underlying environment and see if they declared a port
const PORT = process.env.PORT || 5000
app.listen(PORT);


