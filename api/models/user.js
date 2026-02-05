const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
// on importe le module bcrypt qui permet de hacher des expressions
const bcrypt   = require('bcrypt');

// On définit le schéma de User

const User = new Schema({
    name: {
        type    : String,
        trim    : true,
        required: [ true, 'Le nom est obligatoire' ]
    },
    firstname: {
        type    : String,
        trim    : true
    },
    email: {
        type     : String,
        trim     : true,
        required : [ true, 'L\'email est obligatoire' ],
        unique   : true, // index unique
        lowercase: true
    },
    password: {
        type     : String,
        trim     : true
    },
}, {
    // timestamps ajoute automatiquement les champs createdAt et updatedAt au document
    timestamps: true
});

// Hash le mot de passe quand il est modifié
User.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
    
    next();
});

module.exports = mongoose.model('User', User);


