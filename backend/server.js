//import Node.js dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//create Express server on port 3000
const app = express();
const port = process.env.PORT || 3000; 

//use cors middleware
app.use(cors());

//allow us to parse JSON since server will be recieving and sending JSON
app.use(express.json());

//mongoDB database URI
const uri = process.env.ATLAS_URI; //ATLAS_URI is an environment variable

//connect to MongoDB database through mongoose
//Two flags: useNewUrlParser, useCreateIndex
//useNewUrlParser: mongoDB driver rewrote the tool it uses to parse mongoDB connection strings
//useCreateIndex: to deal with mongoDB depreciating the ensure index function 
//useUnifiedTopology: 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

//once connection is open, confirm so
connection.once('open', () => {
    console.log("MongoDB database connection successful");
});

//import our router files
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

//tell express to use router files
//navigating to /exercise will load everything in the exercise router
//navigating to /user will load everything in the user router
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

//listening in on server from specified port
app.listen(port, () => {
    console.log(`Server is running port: ${port}`);
});