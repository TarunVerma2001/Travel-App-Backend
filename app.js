const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');

const app = express();

//development logging

//Body Parser, Reading data from the body into req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

//allow other request to get access
app.use(cors());

//Routes
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/tours', require('./routes/tourRoutes'));

app.all('*', (req, res, next) => {
  next(new AppError(`cant't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
