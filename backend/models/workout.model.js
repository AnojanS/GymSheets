//import Mongoose and create mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//build workoutSchema with following fields: exercise, sets, description, date
//Each field has following validations: type, required
//timestamps field will keep track of timestamps for when workout was created and modified
const workoutSchema = new Schema({
    exercise: {type: String, required: true},
    sets: {type: Number, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    },
    {timestamps: true},
);

//apply workoutSchema to type Workout
const Workout = mongoose.model('Workout', workoutSchema)
module.exports = Workout;