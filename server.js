var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
const login = require('./server/routes/login');
const apiRoutes = require('./server/routes');
const authCheckMiddleware = require('./server/middleware/authCheck');

// Configuration
mongoose.connect('mongodb://localhost:27017/bain', { useMongoClient: true }, function (err) {
    console.log("db connected");
});

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
app.use(express.static('./server/static/'));
app.use(express.static('./client/public/'));


app.use('/login', login.userlogin);
app.use('/api', authCheckMiddleware);
app.use('/api', apiRoutes);

// listen
app.listen(3000);
console.log("App listening on port 3000");

module.exports = app;