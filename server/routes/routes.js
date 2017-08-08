'use strict';

//all api routes and route logic middleware

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const level1 = require('../models/models').level1;
const NewLevel = require('../models/models').NewLevel;
const ScoreRecord = require('../models/models').ScoreRecord;
const User = require('../models/models').User
const seedFiles = require('../models/high-scores-seed.json');
const db = mongoose.connection;


//the main route that returns a boards size and ID, and saves the tile values to the database
// need to change this to PUT, since it's not currently idempotent
router.get("/build-board", function(req, res, next){
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

// Posts the score of the user after winning a game

router.post("/log-score", function(req, res, next){
    const initials = req.body.initials;
    const score = req.body.score;
    const boardId = req.body.boardId;

    const highScore = new ScoreRecord({
        playerInitials: initials,
        score: score,
        boardId: boardId
    });

    highScore.save(function(err){
        if (err) return console.error(err);
    })
    
})

// Updates the board's status on the server as having been won by a player

router.put("/win", function(req, res, next){
    const id = req.body.id;
    NewLevel.findOne({"_id": id}, function(err, board){
        if (err) console.error(err);
        board.won = true;
       // board.createdAt = board.createdAt;
       // board.length = board.length;
       // board.gameTiles = board.gameTiles;
       board.save(function(err) {
           if (err) res.status(500).send(err)
       })
    })
})

// finds all saved scores on the database, sorts them (ascending), deletes any that aren't in the top 10 from the database
// the organized top 10 will include the user's latest score if they played well enough

router.get('/high-scores/', function(req, res, next){
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

//returns the value of a tile when clicked by the player, this ensures that tile values aren't exposed to the client until clicked on in real time

router.get("/checkmatch/:_id/:a/:b?", function(req, res, next){
    NewLevel.findOne({"_id": req.params._id}, function(err, data){
        if(err) console.error(err)
        let tileA = req.params.a;
        
    if(req.params.b) {
        let tileB = req.params.b;
        //console.log(data.gameTiles[tileA], data.gameTiles[tileB]);
        
    } else {
        //console.log(data.gameTiles[tileA])
    }

        res.json(data.gameTiles[tileA]);
    })
})

module.exports = router;

/*
this counts and fills in the database with enough seeded data to 
generate a full top 10 leaderboard when the server is spun up
*/

/*
disabled 08.07 now that database is live
ScoreRecord.count({}, function( err, count){
    console.log(count);
    if (count <= 10) {
        let diff = (10 - count);
        console.log(diff);
        let seedToTen = seedFiles.slice(0, diff);
        ScoreRecord.create(seedToTen, function(err, newFiles) {
            if (err) console.error(err);
        })
    }
})
*/