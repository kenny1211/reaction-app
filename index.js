const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// all middleware put into use by app.use function
// middleware - preprocessing of different requests before being sent to route handler
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //want cookie to last 30 days
    keys: [keys.cookieKey] //encrypts cookie
  })
);
// tell passport to use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());

// require statements exports the function with (app) as the argument
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
// configuration for how express should behave in production
if (process.env.NODE_ENV === 'production') {
  // ensure express serves up production assets (main.js, main.css files)
  app.use(express.static('client/build'));
  // ensure express will serve up index.html file if it does not recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.listen: express telling node (the runtime) what port to listen to
// process.env: look at the underlying environment and see if they declared a port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
