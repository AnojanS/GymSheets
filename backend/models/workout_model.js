//import Mongoose and create mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //mongoose schema maps to a mongoDB collection

//build workoutSchema with following fields: exercise, sets, description, date
//each field has following validations: type, required
//timestamps field will keep track of timestamps for when workout was created and modified
const workoutSchema = new Schema({
    exercise: {type: String, required: true},
    sets: {type: Number, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    },
    {timestamps: true},
);

//export workoutSchema for use by .../routes/workouts
const Workout = mongoose.model('Workout', workoutSchema) //'Workout is model name
module.exports = Workout; //modules are self-contained units of functionality that can be used throughout Node.js application 