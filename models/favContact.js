const mongoose = require('mongoose');

const favContactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
    }
});

const FavContact = mongoose.model('FavContact', favContactSchema);

module.exports = FavContact;