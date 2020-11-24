require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger')

// mysql connection
var connection = mysql.createConnection({
  host: process.env.MYSQL_CLOUD_HOST,
  user: process.env.MYSQL_CLOUD_USER,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  database: 'PonyList',
})

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
}

// create the express.js object
const app = express()

// connecting the express object to listen on a particular port as defined in the config object.
var server = app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error')
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`)
})

//create sockets server
const options = {
  cors: true,
  origins: ['http://127.0.0.1:5347'],
}
const io = require('socket.io')(server, options)
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    console.log('hello there')
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    })
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` })

    socket.join(user.room)

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  socket.on('disconnect', () => {
    console.log('User has left')
  })
})

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name })

app.use(bodyParser.json())
app.use(
  cors({
    origin: '*',
  })
)
app.use(ExpressAPILogMiddleware(logger, { request: true }))

// Attempting to connect to the database.
connection.connect(function (err) {
  if (err) {
    logger.error('Cannot connect to DB!')
  } else {
    logger.info('Connected to the DB!')
  }
})

// GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.')
})

//LOGIN AND REGISTER
app.post('/registerUser', (req, res) => {
  connection.query(
    'INSERT INTO Users (Username, Password, OnCampus, Dorm, IsStudent, Location) VALUES (?, ?, ?, ?, ?, ?)',
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
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else {
        console.log('check')
        res.status(200).json({
          data: rows,
        })
      }
    }
  )
})

app.post('/loginUser', (req, res) => {
  connection.query(
    'SELECT EXISTS(SELECT * FROM Users WHERE Username = ? AND Password = ?), (SELECT UserID AS result FROM Users WHERE Username = ? AND Password = ?) AS result',
    [
      req.body.Username,
      req.body.Password,
      req.body.Username,
      req.body.Password,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else if (!rows[0].result) {
        res.send('false')
      } else {
        res.status(200).send(rows[0].result.toString())
      }
    }
  )
})

//USERS CALLS
app.get('/users', function (req, res) {
  connection.query('SELECT * FROM Users', function (err, result, fields) {
    if (err) throw err
    res.end(JSON.stringify(result))
  })
})

app.get('/user/:UserID', (req, res) => {
  connection.query(
    'SELECT * FROM Users WHERE UserID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.get('/userRating/:UserID', (req, res) => {
  connection.query(
    'SELECT AVG(r.Rating) as Rating from Reviews r INNER JOIN Users u ON r.SellerID = u.UserID WHERE u.UserID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.get('/reviews/:UserID', (req, res) => {
  connection.query(
    'SELECT * FROM Reviews WHERE SellerID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})


app.post('/addReview', (req, res) => {
  connection.query(
    'INSERT INTO PonyList.Reviews (SellerID, ItemID, BuyerID, ReviewText, Rating) VALUES(?, ?, ?, ?, ?)',
    [
      req.body.SellerID,
      req.body.ItemID,
      req.body.BuyerID,
      req.body.ReviewText,
      req.body.Rating,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else {
        console.log('check')
        res.status(200).json({
          data: rows,
        })
      }
    }
  )
})


app.get('/userItems/:ID', (req, res) => {
  connection.query(
    'SELECT ItemID, ItemName, ItemCost, ItemDetails, ImageURL FROM Items i INNER JOIN Users u on i.SellerID = u.UserID WHERE u.UserID = ?',
    [req.params.ID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.get('/soldItems/:UserID', (req, res) => {
  connection.query(
    'SELECT Items.ItemID, ItemName, ItemCost, ItemDetails, ImageURL FROM Items INNER JOIN Transactions on Items.ItemID = Transactions.ItemID WHERE Transactions.SellerID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.get('/boughtItems/:UserID', (req, res) => {
  connection.query(
    'SELECT Items.ItemID, ItemName, ItemCost, ItemDetails, ImageURL FROM Items INNER JOIN Transactions on Items.ItemID = Transactions.ItemID WHERE Transactions.BuyerID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.get('/sharedProducts/:UserID', (req, res) => {
  connection.query(
    'SELECT * FROM SharedProducts WHERE UserID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})


app.get('/favorites/:UserID', (req, res) => {
  connection.query(
    'SELECT Items.ItemID, ItemName, ItemCost, ItemDetails, ImageURL FROM Items INNER JOIN Favorites on Favorites.ItemID = Items.ItemID WHERE Favorites.UserID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.post('/addFavorite', (req, res) => {
  connection.query(
    'INSERT INTO PonyList.Favorites (UserID, ItemID) VALUES(?, ?)',
    [
      req.body.UserID,
      req.body.ItemID,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else {
        console.log('check')
        res.status(200).json({
          data: rows,
        })
      }
    }
  )
})

app.post('/shareProduct', (req, res) => {
  connection.query(
    'INSERT INTO PonyList.SharedProducts (UserID, ItemID) VALUES(?, ?)',
    [
      req.body.UserID,
      req.body.ItemID,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else {
        console.log('check')
        res.status(200).json({
          data: rows,
        })
      }
    }
  )
})


app.get('/availableTimes/:UserID', (req, res) => {
  connection.query(
    'SELECT Day, Time FROM AvailableTimes WHERE UserID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.post('/addTime', (req, res) => {
  connection.query(
    'INSERT INTO PonyList.AvailableTimes (UserID, Day, Time) VALUES(?, ?, ?)',
    [
      req.body.UserID,
      req.body.Day,
      req.body.Time,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else {
        console.log('check')
        res.status(200).json({
          data: rows,
        })
      }
    }
  )
})

app.get('/onCampusStatus/:UserID', (req, res) => {
  connection.query(
    'SELECT OnCampus FROM Users WHERE UserID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.get('/dormLocation/:UserID', (req, res) => {
  connection.query(
    'SELECT Dorm FROM Users WHERE UserID = ?',
    [req.params.UserID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})


//ITEMS CALLS
app.get('/items', function (req, res) {
  connection.query('SELECT ItemID, SellerID, Username, ItemName, ItemCost, ItemDetails, ImageURL, ImageURL2, ImageURL3, ImageURL4, DatePosted FROM Items Inner Join Users on Items.SellerID = Users.UserID;', function (err, result, fields) {
    if (err) throw err
    res.end(JSON.stringify(result))
  })
})

app.get('/item/:ItemID', (req, res) => {
  connection.query(
    'SELECT ItemID, SellerID, Username, ItemName, ItemCost, ItemDetails, ImageURL, ImageURL2, ImageURL3, ImageURL4, DatePosted FROM Items Inner Join Users on Items.SellerID = Users.UserID WHERE ItemID = ?',
    [req.params.ItemID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.post('/addItem', (req, res) => {
  connection.query(
    'INSERT INTO Items (SellerID, ItemName, ItemCost, ItemDetails, ImageURL, ImageURL2, ImageURL3, ImageURL4) VALUES (?, ?, ?, ?, ?)',
    [
      req.body.SellerID,
      req.body.ItemName,
      req.body.ItemCost,
      req.body.ItemDetails,
      req.body.ImageURL,
      req.body.ImageURL2,
      req.body.ImageURL3,
      req.body.ImageURL4,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else {
        console.log('check')
        res.status(200).json({
          data: rows,
        })
      }
    }
  )
})

app.get('/isSold/:ItemID', (req, res) => {
  connection.query(
    'SELECT COUNT(1) FROM Transactions WHERE ItemID = ?',
    [req.params.ItemID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

//transaction calls
app.get('/allTransactions', function (req, res) {
  connection.query('SELECT * FROM Transactions', function (err, result, fields) {
    if (err) throw err
    res.end(JSON.stringify(result))
  })
})

app.post('/buyItem', (req, res) => {
  connection.query(
    'INSERT INTO Transactions (BuyerID, SellerID, ItemID, Rating) VALUES(?, ?, ?, ?)',
    [
      req.body.BuyerID,
      req.body.SellerID,
      req.body.ItemID,
      req.body.Rating,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else {
        console.log('check')
        res.status(200).json({
          data: rows,
        })
      }
    }
  )
})


//MESSAGES CALLS

app.post('/sendMessage', (req, res) => {
  connection.query(
    'INSERT INTO Messages (RecipientID, SenderID, MessageText) VALUES (?, ?, ?)',
    [req.body.RecipientID, req.body.SenderID, req.body.MessageText],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        })
      } else {
        console.log('check')
        res.status(200).json({
          data: rows,
        })
      }
    }
  )
})

app.get('/messages/:SenderID/:RecipientID', (req, res) => {
  connection.query(
    'SELECT * FROM Messages WHERE SenderID = ? AND RecipientID = ?',
    [req.params.SenderID, req.params.RecipientID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.get('/contacts/:SenderID', (req, res) => {
  connection.query(
    'SELECT DISTINCT(RecipientID), Username FROM Messages INNER JOIN Users on Messages.RecipientID = Users.UserID WHERE SenderID = ?',
    [req.params.SenderID],
    function (err, result, fields) {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})
