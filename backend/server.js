require('dotenv').config();
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
  database: 'PonyList',
});

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// connecting the express object to listen on a particular port as defined in the config object.
var server = app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

//create sockets server
const options = {
  cors: true,
  origins: ['http://127.0.0.1:5347'],
};
const io = require('socket.io')(server, options);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    console.log('hello there, bitch');
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` });

    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// Attempting to connect to the database.
connection.connect(function (err) {
  if (err) {
    logger.error('Cannot connect to DB!');
  } else {
    logger.info('Connected to the DB!');
  }
});

// GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

//LOGIN AND REGISTER
app.post('/registerUser', (req, res) => {
  connection.query(
    'INSERT INTO Users (Username, Password, OnCampus, Dorm, IsStudent, Location) VALUES (?, ?, ?, ?, ?, ?);',
    [
      req.body.Username,
      req.body.Password,
      req.body.OnCampus,
      req.body.Dorm,
      req.body.IsStudent,
      req.body.Location,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query');
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        });
      } else {
        console.log('check');
        res.status(200).json({
          data: rows,
        });
      }
    }
  );
});

app.post('/loginUser', (req, res) => {
  connection.query(
    'SELECT EXISTS(SELECT * FROM Users WHERE Username = ? AND Password = ?), (SELECT UserID AS result FROM Users WHERE Username = ? AND Password = ?) AS result;',
    [
      req.body.Username,
      req.body.Password,
      req.body.Username,
      req.body.Password,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query');
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        });
      } else if (!rows[0].result) {
        res.send('false');
      } else {
        res.status(200).send(rows[0].result.toString());
      }
    }
  );
});

//USERS CALLS
app.get('/users', function (req, res) {
  connection.query('SELECT * FROM Users', function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result));
  });
});

app.get('/user/:UserID', (req, res) => {
  connection.query(
    'SELECT * FROM Users WHERE UserID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    }
  );
});

app.get('/userItems/:ID', (req, res) => {
  connection.query(
    'SELECT ItemID, ItemName, ItemCost, ItemDetails, IsSold, ImageURL FROM Items i INNER JOIN Users u on i.SellerID = u.UserID WHERE u.UserID = ?',
    [req.params.ID],
    function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    }
  );
});

//ITEMS CALLS
app.get('/items', function (req, res) {
  connection.query('SELECT * FROM Items', function (err, result, fields) {
    if (err) throw err;
    res.end(JSON.stringify(result));
  });
});

app.get('/item/:ItemID', (req, res) => {
  connection.query(
    'SELECT * FROM Items WHERE ItemID = ?',
    [req.params.ItemID],
    function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    }
  );
});

app.post('/addItem', (req, res) => {
  connection.query(
    'INSERT INTO Items (SellerID, ItemName, ItemCost, ItemDetails, ImageURL) VALUES (?, ?, ?, ?, ?);',
    [
      req.body.SellerID,
      req.body.ItemName,
      req.body.ItemCost,
      req.body.ItemDetails,
      req.body.ImageURL,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query');
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        });
      } else {
        console.log('check');
        res.status(200).json({
          data: rows,
        });
      }
    }
  );
});

//MESSAGES CALLS

app.post('/sendMessage', (req, res) => {
  connection.query(
    'INSERT INTO Messages (RecipientID, SenderID, MessageText) VALUES (?, ?, ?);',
    [req.body.RecipientID, req.body.SenderID, req.body.MessageText],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query');
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        });
      } else {
        console.log('check');
        res.status(200).json({
          data: rows,
        });
      }
    }
  );
});

app.get('/messages/:SenderID/:RecipientID', (req, res) => {
  connection.query(
    'SELECT * FROM Messages WHERE SenderID = ? AND RecipientID = ?',
    [req.params.SenderID, req.params.RecipientID],
    function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    }
  );
});

app.get('/contacts/:SenderID', (req, res) => {
  connection.query(
    'SELECT RecipientID FROM Messages WHERE SenderID = ?',
    [req.params.SenderID],
    function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    }
  );
});
