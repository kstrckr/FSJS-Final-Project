'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const level1 = require('../models/models').level1;
const NewLevel = require('../models/models').NewLevel;
const db = mongoose.connection;

router.get("/", function(req, res, next){
    res.render('index', { title: 'Hey', message: 'Hello there!' });
})

router.get("/method", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const level1 = new NewLevel();
    level1.generateBoard(12);
    let boardIngredients = {};
    boardIngredients.length = level1.length;
    boardIngredients.id = level1._id;
    res.send(boardIngredients);
    
    level1.save(function(err, level1){
        if(err) return console.error(err);
    })
    
    
    
})

router.get("/checkmatch/:_id/:a/:b?", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    NewLevel.findOne({"_id": req.params._id}, function(err, data){
        if(err) console.error(err)
        let tileA = req.params.a;
        
    if(req.params.b) {
        let tileB = req.params.b;
        console.log(data.gameTiles[tileA], data.gameTiles[tileB]);
        
    } else {
        console.log(data.gameTiles[tileA])
    }

        res.json(data.gameTiles[tileA]);
    })
})



module.exports = router;