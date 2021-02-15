//import express router
const router = require('express').Router();

//import workout schema
let Workout = require('../models/workout_model');

//API endpoint that handles HTTP GET requests on '.../workouts/' path
//find() is mongoose method that reads list of all workouts from MongoDB database
router.route('/').get((req, res) => {
    Workout.find()
        .then(workouts => res.json(workouts)) //return list of workouts from db in json format
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught
});


//API endpoint that handles HTTP POST requests on '.../workouts/add' path
router.route('/add').post((req, res) => {
    //create new Workout instance using given schema inputs 
    const exercise = req.body.exercise;
    const sets = Number(req.body.sets); //convert to Number type
    const description = req.body.description;
    const date = Date.parse(req.body.date); //convert to Date type
    const newWorkout = new Workout({
        exercise,
        sets,
        description,
        date,
    });

    //write new workout to database
    //save() is a mongoose method that writes new workout entry into MongoDB database
    newWorkout.save()
        .then(() => res.json('Workout added!')) //confirmation message
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught
});

//API endpoint that handles HTTP GET requests on '.../workouts/id' path
//Read a single workout
//:id represents object id of MongoDB documents that are created by the MongoDB Driver
router.route('/:id').get((req, res) => {
    Workout.findById(req.params.id) //find workout with object id provided in url
        .then(workout => res.json(workout))
        .catch(err => res.status(400).json('Error: ' + err));
});

//API endpoint that handles HTTP POST requests on '.../workouts/update/id' path
//Update a single workout
//:id represents object id of MongoDB documents that are created by the MongoDB Driver
router.route('/update/:id').post((req, res) => {
    Workout.findById(req.params.id) //find workout with object id provided in url
        .then(workout => {
            workout.exercise = req.body.exercise;
            workout.sets = Number(req.body.sets);
            workout.description = req.body.description;
            workout.date = Date.parse(req.body.date);

            workout.save()
                .then(() => res.json('Workout updated!'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err)); 
});

//API endpoint that handles HTTP DELETE requests on '.../workouts/id' path
//Delete a single workout
//:id represents object id of MongoDB documents that are created by the MongoDB Driver
router.route('/:id').delete((req, res) => {
    Workout.findByIdAndDelete(req.params.id) //find and delete workout using object id provided in url
        .then(() => res.json('Workout deleted'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

//export router so that it can be used by the server
module.exports = router;