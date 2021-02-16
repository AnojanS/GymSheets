//import Mongoose and create mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //mongoose schema maps to a mongoDB collection

//build exerciseSchema with following fields: exercise
//exercise has following validations: type, required, unique, trim, minlength
//timestamps field will keep track of timestamps for when exercise was created and modified
const exerciseSchema = new Schema({
    exercise: {
        type: String,
        required: true,
        unique: true,
        trim: true, //trim leading and following white space
        minlength: 3},
    }, 
    {timestamps: true},
);

//export exerciseSchema for use by .../routes/exercises
const Exercise = mongoose.model('Exercise', exerciseSchema) //'Exercise' is model name
module.exports = Exercise; //modules are self-contained units of functionality that can be used throughout Node.js application 
