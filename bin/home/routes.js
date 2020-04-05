/*
 * @router: To handle routes pointing to /api
 * @desc: to provide search / seek api for frontend
 */

require('dotenv').config();

// load express
const express = require('express');

// load request alternative
const request = require('request');

// load logger
const logger = require('../logger/winston');

// create instance of Router
const router = express.Router();

// route to /api. shows welcome message, and (maybe) other stuff too
router.get('/', (req, res) => {
  res.send('api working');
});

router.get('/summary', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://api.covid19api.com/summary',
    headers: {},
  };

  request(options, (error, response) => {
    if (error) {
      res.send('Error Connecting to Services');
    }

    const processedData = JSON.parse(response.body);
    const responseString = `total:${processedData.Global.TotalConfirmed}|recovered:${processedData.Global.TotalRecovered}|deaths:${processedData.Global.NewDeaths}`;
    // res.json(processedData.Global);
    res.send(responseString);
    logger.info(processedData);
  });
});

// export everything !
module.exports = router;
