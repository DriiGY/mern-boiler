
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
});

//before we save
userSchema.pre('save', function (next) {
    var user = this; //used to refer to userschema

    if (user.isModified('password')) {//if password is modified this process of hashing is triggered
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            //if no error:
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;//instead of password we display in db the hash password
                next();
            })
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //cb=callback
    //this.password=user schema password
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err);//send err
        cb(null, user);//err,user
    })
}


userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema);

module.exports = { User }