const mongoose = require('mongoose');

const List = new mongoose.Schema({
    email: {type: String},
    Title:{type: String},
    year:{type: String},
    imdbID:{type: String, unique: true},
    type:{type: String},
    Poster:{type: String}
});

const model = mongoose.model('userlist', List);

module.exports = model;