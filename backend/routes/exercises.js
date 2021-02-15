//import express router
const router = require('express').Router();

//import exercise schema
let Exercise = require('../models/exercise_model');

//API endpoint that handles HTTP GET requests on '.../exercises/' path
//find() is mongoose method that reads list of all exercises from MongoDB database  
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises)) //return list of exercises from db in json format
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught 
});

//API endpoint that handles HTTP POST requests on '.../exercises/add' path
router.route('/add').post((req, res) => {
    //create new Exercise instance using given exercise
    const exercise = req.body.exercise;
    const newExercise = new Exercise({exercise});
    
    //write new exercise to database
    newExercise.save()
        .then(() => res.json('Exercise added!')) //return success message after exercise has been added
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught 
});

//export router so that it can be used by the server
module.exports = router;