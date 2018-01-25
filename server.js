'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const uptimeHelper = require('./helpers/uptime');

if (process.env.NODE_ENV === 'test') {
  process.env.PORT = 3001;
}

const port = process.env.PORT ||  3000;

const app = express();
app.use(bodyParser.json());

const routes = require('./routes'); 

app.use(routes);

app.listen(port,  function() {
  console.log(`Express server listening on port ${port}`);
});

uptimeHelper.init();

module.exports = app; 