const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

global.q = require('q');
global._ = require('underscore');
global.config = require('./config/config.json');
global.dbQuery = require('./services/mysqlCon');
global.queries = require('./services/queryFile');

const BASE_URL = config.BASE_URL;


app.use(cors());

app.use(bodyParser.raw({
  limit: '50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));


/* PING FOR TESTING API STATUS */
app.get(BASE_URL + '/ping', (req, res) => {
  res.status(200).send("Pong");
});


/* SKILL SET APIs */
app.post(BASE_URL + '/skills', require('./api/controllers/addSkill').start);
// app.post(BASE_URL + '/placeOrder', require('./api/controllers/placeOrder').placeOrder);
// app.post(BASE_URL + '/predictValue', require('./api/controllers/predictValue').predictValue);
// app.post(BASE_URL + '/orderStatus', require('./api/controllers/orderStatus').orderStatus);

app.use((err, req, res, next) => {
  console.log('-----Something broke!---', err);
  res.status(500).send('Something broke!');
});

/* 404 ROUTE NOT FOUND */
app.get('*', (req, res) => {
  // console.log("no route found,throwing 404 error." + req.url);
  res.status(404).send({
    code: 404,
    error: "404 PAGE not found >" + req.url + '<<'
  });
});


/* SERVER START */
let port = process.env.PORT || 3000;
let server = app.listen(port);
server.timeout = 600000;
module.exports = exports;

module.exports = exports;

console.log('API is running on port: ' + port);
console.log('try this: curl http://localhost:' + port + BASE_URL + '/ping');
