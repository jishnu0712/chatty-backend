const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 8080;

const authRoutes = require('./routes/auth');

const mongoose = require('mongoose');

const app = express();

// middlewares
app.use(bodyParser.json());


// routes
app.use('/auth', authRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  const message = err.message;
  const status = err.statusCode || 500;
  const data = err.data;
  res.status(status).json({message: message, data: data});
});



mongoose.connect(process.env.MONGODB_URI)
  .then((connection) => {
    app.listen(port, () => console.log('listening on port:  ' + port));
  })
  .catch((err) => console.error(err));
  