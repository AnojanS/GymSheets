//import Mongoose and create mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//biold exerciseSchema with following fields: username, description, duration, date
//Each field has following validations: type, required
//timestamps field will keep track of timestamps for when exercise was created and modified
const exerciseSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
    },
    {timestamps: true},
);

//apply exerciseSchema to type Exercise
const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise;