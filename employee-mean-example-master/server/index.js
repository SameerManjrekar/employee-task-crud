const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const employeeRoute = require('./routes/employee');
const config = require('./config/database');

const port = process.env.port || config.port;

// Mongoose Database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Database connection error ', err);
    } else {
        console.log('Connected to database ', config.db);
    }
});

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// To Log errors to console
app.use(morgan('dev'));

// CORS Middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Sameer, Welcome to Employee CRUD operation');
});

app.use('/employee', employeeRoute);

app.listen(port, () => {
    console.log('Sever listening on port', port);
});