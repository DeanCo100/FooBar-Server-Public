const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

var app = express();

// Middleware setup
app.use(bodyParser.urlencoded({limit: '20mb',extended: true}));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));
app.use(cors());
app.use(express.static('public'));

// Connecting to the MongoDB server
process.env.NODE_ENV ='local'
const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define and mount routes
const users = require('./routes/user');
const login = require('./routes/login');
const posts = require('./routes/post');
app.use('/api/users', users);
app.use('/api/tokens', login);
app.use('/api/posts', posts);

// Start the server on the specified port
app.listen(process.env.PORT);
