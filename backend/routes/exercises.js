//import express router
const router = require('express').Router();

//import exercise schema
let Exercise = require('../models/exercise_model');

//API endpoint that handles HTTP GET requests on '.../exercises/' path 
router.route('/').get((req, res) => {
    Exercise.find() //Model.find() is mongoose method used to query MongoDB database of type Model, no parameter queries return all documents
        .then(exercises => res.json(exercises)) //return list of exercises from db in json format
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught 
});

//API endpoint that handles HTTP POST requests on '.../exercises/add' path
router.route('/add').post((req, res) => {
    //create new Exercise instance using given exercise
    const exercise = req.body.exercise; //req.body is json input
    const newExercise = new Exercise({exercise});
    
    //write new exercise to database
    newExercise.save() //Model.save() is mongoose method used to save a new document to Model collection of MongoDB database
        .then(() => res.json('Exercise added!')) //return success message in console after exercise has been added
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught 
});

//find() and save() are asynchronous methods so they return promises that we can wait one

//export router so that it can be used by the server
module.exports = router; 