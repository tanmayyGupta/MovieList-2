const mongoose = require('mongoose');

const List = new mongoose.Schema({
    email: {type: String},
    listType: {type: Number, required: true},
    userRating: {type: String},
    Title:{type: String},
    Year:{type: String},
    imdbID:{type: String},
    type:{type: String},
    Poster:{type: String}
});

const model = mongoose.model('updated-userlist', List);

module.exports = model;