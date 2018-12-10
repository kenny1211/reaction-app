const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

// app.listen: express telling node (the runtime) what port to listen to
// process.env: look at the underlying environment and see if they declared a port
const PORT = process.env.PORT || 5000
app.listen(PORT);


