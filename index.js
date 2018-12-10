const express = require('express');
const app = express();

// route handler for get request
app.get('/', (req, res) => {
  res.send({bye: 'buddy'});
});

// app.listen: express telling node (the runtime) what port to listen to
// process.env: look at the underlying environment and see if they declared a port
const PORT = process.env.PORT || 5000
app.listen(PORT);


