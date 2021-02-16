import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateWorkout extends Component {
  constructor(props) {
    super(props);

    //ensure 'this' works properly by binding it to event handler methods
    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onChangeSets = this.onChangeSets.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //properties of state correspond to workout schema
    this.state = {
      exercise: '',
      description: '',
      sets: 0,
      date: new Date(),
      exercises: []
    }
  }

  componentDidMount() {
    //GET request for exercises for drop down
    axios.get('http://localhost:3000/exercises/')
      .then(response => {
        if (response.data.length > 0) { //data is what is returned from database, it is a list of json documents
          this.setState({
            exercises: response.data.map(exercise => exercise.exercise), //set list of exercises that will be available in dropdown from exercise JSON objects
            exercise: response.data[0].exercise //default exercise on form is first exercise in the database
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  //Event handler methods used to update state of each form element
  onChangeExercise(e) { //e represents form event
    this.setState({
      exercise: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeSets(e) {
    this.setState({
      sets: e.target.value
    })
  }

  onChangeDate(date) { //no event since we are using react's date picker library
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault(); //prevent default react form onSubmit behaviour so that we can make post request

    const newWorkout = {
      exercise: this.state.exercise,
      description: this.state.description,
      sets: this.state.sets,
      date: this.state.date
    }
    console.log(newWorkout);

    //POST request to create new workout entry
    //endpoint is expecting the newWorkout JSON object in the request body
    axios.post('http://localhost:3000/workouts/add', newWorkout)
      .then(res => console.log(res.data));

    window.location = '/'; //after form is submitted, navigate to workout log page
  }

  render() {
    return (
    //create workout form
    <div>
      <h3>Create New Workout Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Exercise: </label>
          <select ref="exerciseInput"
              required
              className="form-control"
              value={this.state.exercise}
              onChange={this.onChangeExercise}>
              {
                this.state.exercises.map(function(exercise) {
                  //exercise dropdown list
                  return <option 
                    key={exercise}
                    value={exercise}>{exercise}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Number of Sets: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.sets}
              onChange={this.onChangeSets}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Workout Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}