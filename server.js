const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const authController = require('./src/controllers/auth')
const cors = require('cors')
const app = express();
require('dotenv').load()


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

//////////////////////////////////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////////////////////////////////

app.use('/auth', require('./src/routes/auth'))
app.use('/snacks', require('./src/routes/snacks'))
app.use('/users', require('./src/routes/users'))

//////////////////////////////////////////////////////////////////////////////
// Default Route
//////////////////////////////////////////////////////////////////////////////


app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} ${req.path}`;
  res.status(status).json({ status, message });
});

//////////////////////////////////////////////////////////////////////////////
// Error Handling
//////////////////////////////////////////////////////////////////////////////

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).json({ message, status });
});

//////////////////////////////////////////////////////////////////////////////

// Routes
//////////////////////////////////////////////////////////////////////////////

app.use('/auth', require('./src/routes/auth'))

//////////////////////////////////////////////////////////////////////////////
// example routes, not part of an organized application
//////////////////////////////////////////////////////////////////////////////

app.get('/protected',
        authController.isAuthenticated,
        function(req, res, next){ res.send({ id: req.claim.id, message: "For authenticated eyes only" }) })

app.get('/protected/:userId',
        authController.isAuthenticated,
        authController.isSelf,
        function(req, res, next){ res.send({ id: req.claim.id, message: "For your eyes only"}) })


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port', port);
});
