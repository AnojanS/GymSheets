//import express router
const router = require('express').Router();

//import user schema
let User = require('../models/user.model');

//API endpoint that handles HTTP GET requests on '.../users/' path
//find() is mongoose method that reads list of all users from MongoDB database  
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users)) //return list of users from db in json format
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught 
});

//API endpoint that handles HTTP POST requests on '.../users/add' path
router.route('/add').post((req, res) => {
    //create new User instance using given username
    const username = req.body.username;
    const newUser = new User({username});
    
    //write new user to database
    newUser.save()
        .then(() => res.json('User added!')) //return success message after user has been added
        .catch(err => res.status(400).json('Error: ' + err)); //return status 400 with error message if error is caught 
});

//export router so that it can be used by the server
module.exports = router;