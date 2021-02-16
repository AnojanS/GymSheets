import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditWorkout extends Component {
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
    //GET request for specfic workout to fill out form with workout data
    //this.props.match.params.id gives us id of chosen workout using :id that was used in route path
    axios.get('http://localhost:3000/workouts/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          exercise: response.data.exercise,
          sets: response.data.sets,
          description: response.data.description,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    
    //GET request for all exercises for dropdown
    axios.get('http://localhost:3000/exercises/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            exercises: response.data.map(exercise => exercise.exercise),
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

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault(); //prevent default react form onSubmit behaviour so that we can make post request

    const updatedWorkout = {
      exercise: this.state.exercise,
      sets: this.state.sets,
      description: this.state.description,
      date: this.state.date
    }

    console.log(updatedWorkout);

    //POST request to update specific workout using its object id
    axios.post('http://localhost:3000/workouts/update/' + this.props.match.params.id, updatedWorkout)
      .then(res => console.log(res.data));

    window.location = '/'; //navigate back to workout log page
  }

  render() {
    return (
    //edit workout form
    <div>
      <h3>Edit Workout Log</h3>
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
          <input type="submit" value="Edit Workout Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}