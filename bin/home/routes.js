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
    const iniData = `
[globalSummary]
NewConfirmed:${processedData.Global.NewConfirmed}
TotalConfirmed:${processedData.Global.TotalConfirmed}
NewDeaths:${processedData.Global.NewDeaths}
TotalDeaths:${processedData.Global.TotalDeaths}
NewRecovered:${processedData.Global.NewRecovered}
TotalRecovered:${processedData.Global.TotalRecovered}
[India]
IndiaNewConfirmed:${processedData.Countries[99].NewConfirmed}
IndiaTotalConfirmed:${processedData.Countries[99].TotalConfirmed}
IndiaNewDeaths:${processedData.Countries[99].NewDeaths}
IndiaTotalDeaths:${processedData.Countries[99].TotalDeaths}
IndiaNewRecovered:${processedData.Countries[99].NewRecovered}
IndiaTotalRecovered:${processedData.Countries[99].TotalRecovered}
`;
    // res.json(processedData);
    res.send(iniData);
    logger.info(processedData);
  });
});

// export everything !
module.exports = router;
