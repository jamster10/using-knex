'use strict';

require('dotenv').config();
const app = require('express')();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { API_KEY } = require('./config');
const { errorHandler } = require('./util/errorHandling');
const { morgan_Settings, cors_Settings, logger } = require('./util/middleware.js');


app.use( (req, res, next) => {
  const userToken = req.get('Authorization');
  if( userToken.split(' ')[1] !== API_KEY){
    logger.error(`Unauthorized attempt using key: ${userToken ? userToken.split(' ')[1] : 'null'}`);
    let error = {
      status: 401,
      message: 'You do not have access to this server. GO AWAY, OR ELSE'
    };
    return res.status(401).send(error);
  }
  next();
});

app.use(morgan(morgan_Settings));
app.use(helmet());
app.use(cors(cors_Settings));


app.get('/', (req, res) => {
  res.send('Hello, Boilerplate!');
});


app.use('*', (req, res, next) => {
  res.status(404).send('Resource not Found');
});

app.use(errorHandler);

module.exports = app;