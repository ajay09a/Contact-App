const mongoose = require('mongoose');

const trashContactSchema = new mongoose.Schema({
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

const TrashContact = mongoose.model('TrashContact', trashContactSchema);

module.exports = TrashContact;