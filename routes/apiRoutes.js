/*
 * @router: To handle routes pointing to /api
 * @desc: to provide search / seek api for frontend
 */

require('dotenv').config();

// load express
const express = require('express');

// load logger
const logger = require('./../bin/logger/winston');

// create instance of Router
const router = express.Router();

// route to /api. shows welcome message, and (maybe) other stuff too
router.get('/', (req, res) => {
  res.json({
    message: 'This series of routes handle all calls from frontend',
  });
});

// export everything !
module.exports = router;
