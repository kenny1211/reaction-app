const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

// app.listen: express telling node (the runtime) what port to listen to
// process.env: look at the underlying environment and see if they declared a port
const PORT = process.env.PORT || 5000
app.listen(PORT);


