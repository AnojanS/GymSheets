//import Mongoose and create mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//build userSchema with following fields: username
//username has following validations: type, required, unique, trim, minlength
//timestamps field will keep track of timestamps for when user was created and modified
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //trim leading and following white space
        minlength: 3},
    }, 
    {timestamps: true},
);

//apply userSchema to type User
const User = mongoose.model('User', userSchema)
module.exports = User;