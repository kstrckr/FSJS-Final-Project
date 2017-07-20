'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const level1 = require('../models/models').level1;
const NewLevel = require('../models/models').NewLevel;
const ScoreRecord = require('../models/models').ScoreRecord;
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

router.post("/log-score", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const initials = req.body.initials;
    const score = req.body.score;
    const boardId = req.body.boardId;

    const highScore = new ScoreRecord({
        playerInitials: initials,
        score: score,
        boardId: boardId
    });
    console.log(highScore);

    highScore.save(function(err){
        if (err) return console.error(err);
    })
    
})

router.get('/high-scores/', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    ScoreRecord.find({}, function(err, scores){

        scores.sort((a, b) => a.score - b.score)
        res.json(scores.slice(0,10));
        if (scores.length > 10){
        let scoreFloor = scores[10].score
            ScoreRecord.remove({score: {$gte: scoreFloor}}, function (err) {
                if (err) console.error(err);
                console.log('Losers Purged!');
            })
        }
        
        
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