'use strict';

/*
sets up the server for routing of compiled Angular source files and the api
*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json;
const path = require('path');
const session = require('express-session');

const routes = require('./server/routes/routes');

const config = require('./server/config');

mongoose.connect("mongodb://localhost:27017/sandbox")

//connects to mongodb
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("DB Connected");
})

app.use(jsonParser());

app.use(session({
    secret: 'Master the Match',
    resave: true,
    saveUninitialized: false
}))

// static directory setup
app.use(express.static(path.join(__dirname, 'dist')))

// defines all api routes
app.use("/api", routes);

// ensures all non api url's get served the compiled and rendered Angular index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.listen(config.port, function(){
    console.log(`You've Got Node on port ${config.port}`)
});