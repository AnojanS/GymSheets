//import Node.js dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//create Express server on port 3000
const app = express();
const port = process.env.PORT; 

//use cors middleware since our frontend and backend are on seperate servers
app.use(cors());

//allow us to send JSON
//necessary for PUT and POST, not GET and DELETE
app.use(express.json());

//mongoDB database URI
const uri = process.env.ATLAS_URI; //ATLAS_URI is an environment variable

//connect to MongoDB database through mongoose
//useNewUrlParser, useCreateIndex, useUnifiedTopology are flags used to deal with deprecation warnings in the MongoDB Node.js driver
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

//once connection is open, confirm so
connection.once('open', () => {
    console.log("MongoDB database connection successful");
});

//import our router files
const workoutRouter = require('./routes/workouts');
const exerciseRouter = require('./routes/exercises');

//tell express to use router files
//navigating to /workouts will load everything in the workout router
//navigating to /exercises will load everything in the exercise router
app.use('/workouts', workoutRouter);
app.use('/exercises', exerciseRouter);

//listening in on server from specified port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});