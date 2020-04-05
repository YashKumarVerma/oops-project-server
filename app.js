require('dotenv').config();

// load express
const express = require('express');

// load bodyparser to parse post bosy
const bodyparser = require('body-parser');

// load logger for easy debug
const logger = require('./bin/logger/winston');

// create instance of express
const app = express();

// define port to start server on
const port = process.env.PORT || 3000;

// parse valid requests only
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);

app.use(bodyparser.json());

// bind routes to application
app.use('/', require('./bin/home/routes'));

// start listening on ports
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`);
});
