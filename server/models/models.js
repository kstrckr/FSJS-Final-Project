'use strict';

// mongoose models
// MatchGameSchema defines a single game full of tiles on the game-board
// PlayerScoreSchema defines a single score from a single game tied to the initials entered by the user

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const allCodes = require('./unicodes');
var Schema = mongoose.Schema;

//User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }

})

UserSchema.static.authenticate = function(username, password, callback) {
    User.findOne( {email: email })
        .exec(function(error, user) {
            if (error) {
                return callback(error);
            } else if (!user ) {
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        })
}

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next;
    })
});

const MatchGameSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    won: {type: Boolean, default: false},
    length: Number,
    gameTiles: {type: [], default: []}
})

const PlayerScoreSchema = new Schema({
    playerInitials: String,
    score: Number,
    boardId: String
})

//Instance Method
MatchGameSchema.methods.generateBoard = function(length){
    let newBoard = [];
    let totalTiles = length/2
    let possibleTiles = allCodes.codes;
    for(let i = 0; i < totalTiles; i++) {
        let randomNumb = Math.floor(Math.random() * possibleTiles.length)-1;
        let newTile = `&#${possibleTiles[randomNumb]}`;
        newBoard.push(newTile);
    }

    let output = newBoard.concat(newBoard);
    output.sort((a, b) => {return 0.5 - Math.random()});
    console.log(output.length);

    this.length = length
    this.gameTiles = output;
}




const NewLevel = mongoose.model('NewLevel', MatchGameSchema);
const ScoreRecord = mongoose.model('ScoreRecord', PlayerScoreSchema);
const User = mongoose.model('User', UserSchema);


//module.exports.level1 = level1;
module.exports.NewLevel = NewLevel;
module.exports.ScoreRecord = ScoreRecord;
