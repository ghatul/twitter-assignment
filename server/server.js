const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const indexRouter = require('./routes');
const mongoService = require('./dataaccess/mongo.service');
/* Helmet can help protect app from some well-known web
vulnerabilities by setting HTTP headers appropriately.*/
app.use(helmet());

// Enabling Gzip compression
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use((req,res,next) => {
  req.io = io
  next();
});

app.use('/api', indexRouter);

io.on('connection', (client) => {
  console.log('----------Client connected...');
  client.on('join', function(data) {
      console.log(data);
  });

  client.on('chat message', function(msg) {
    console.log('message: ' + msg.message);
  });

  client.on('messages', function(data) {
         client.emit('broad', data);
         client.broadcast.emit('broad',data);
  });

});

io.on('connect_error', (err) => {
  console.log('socket connected error --> ' + err);
})

//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected socket

// Error handler
mongoService.connect().then(result => {
  server.listen(4001, () => console.log('Application running on port:4001'));
}).catch(err => {
  console.log('connection errrrr');
});