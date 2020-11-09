require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

// mysql connection
var connection = mysql.createConnection({
  host: process.env.MYSQL_CLOUD_HOST,
  user: process.env.MYSQL_CLOUD_USER,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
});

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

// GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

app.post('/registerUser', (req, res) => {
  connection.query('INSERT INTO Users (Username, Password, OnCampus, Dorm, IsStudent, Location, MilesAway) VALUES (?, ?, ?, ?, ?, ?, ?);', [req.body.Username, req.body.Password, req.body.OnCampus, req.body.Dorm, req.body.Location, req.body.MilesAway], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
})



// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
