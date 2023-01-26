const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;