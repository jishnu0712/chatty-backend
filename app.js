const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 8080;

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const mongoose = require('mongoose');

const app = express();

// middlewares
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());

// routes
app.use('/auth', authRoutes);

// chat
app.use('/chat', chatRoutes);

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
  