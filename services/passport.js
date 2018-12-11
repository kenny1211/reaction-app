const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// let passport know to use google strategy in the auth process
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('access token: ', accessToken);
    console.log('refresh token: ', refreshToken);
    console.log('profile: ', profile);
    console.log('done: ', done);
  }
)
);
