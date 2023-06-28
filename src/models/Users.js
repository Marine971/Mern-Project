const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'Users' }); // Spécifiez le nom de la collection ici

const Users = mongoose.model('Users', userSchema); // Utilisez 'User' comme nom de modèle

module.exports = Users;
