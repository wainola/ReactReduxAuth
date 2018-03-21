const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
// App setup
// MORGAN IS A LOGING LIBRARY
app.use(morgan('combined'));
// BODYPARSER.JSON PARSE ALL THE INCOMING REQUEST AS JSON
app.use(bodyParser.json({type: '*/*'}));
router(app);

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth');

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);