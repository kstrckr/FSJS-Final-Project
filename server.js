'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json;
const path = require('path');

const routes = require('./server/routes/routes');

const config = require('./server/config');

mongoose.connect("mongodb://localhost:27017/sandbox")

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("DB Connected");
})

app.use(express.static(path.join(__dirname, 'dist')))

app.use("/api", routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.listen(config.port, function(){
    console.log(`Glorious node app running on port ${config.port}`)
});