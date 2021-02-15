//import express router
const router = require('express').Router();

//import exercise schema
let Exercise = require('../models/exercise.model');

//API endpoint that handles HTTP GET requests on '.../exercises/' path
//find() is mongoose method that reads list of all exercises from MongoDB database
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises)) //return list of exercises from db in json format
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught
});


//API endpoint that handles HTTP POST requests on '.../exercises/add' path
router.route('/add').post((req, res) => {
    //create new Exercise instance using given schema inputs 
    const username = req.body.username;
    const sets = Number(req.body.sets); //convert to Number type
    const description = req.body.description;
    const date = Date.parse(req.body.date); //convert to Date type
    const newExercise = new Exercise({
        username,
        sets,
        description,
        date,
    });

    //write new exercise to database
    //save() is a mongoose method that writes new exercise entry into MongoDB database
    newExercise.save()
        .then(() => res.json('Exercise added!')) //confirmation message
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught
});

//API endpoint that handles HTTP GET requests on '.../exercises/id' path
//Read a single exercise
//:id represents object id of MongoDB documents that are created by the MongoDB Driver
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id) //find exercise with object id provided in url
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

//API endpoint that handles HTTP POST requests on '.../exercises/update/id' path
//Update a single exercise
//:id represents object id of MongoDB documents that are created by the MongoDB Driver
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id) //find exercise with object id provided in url
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.sets = Number(req.body.sets);
            exercise.description = req.body.description;
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err)); 
});

//API endpoint that handles HTTP DELETE requests on '.../exercises/id' path
//Delete a single exercise
//:id represents object id of MongoDB documents that are created by the MongoDB Driver
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id) //find and delete exercise using object id provided in url
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

//export router so that it can be used by the server
module.exports = router;