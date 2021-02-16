import React, { Component } from 'react';
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    
    //ensure 'this' works properly by binding it to event handler methods
    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //properties of state correspond to exercise schema
    this.state = {
      exercise: ''
    }
  }

  //Event handler methods used to update state of each form element
  onChangeExercise(e) { //e represents form event
    this.setState({
      exercise: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault(); //prevent default react form onSubmit behaviour so that we can make post request

    const newExercise = {exercise: this.state.exercise}
    console.log(newExercise);

    //POST request to create new exercise entry
    //endpoint is expecting the newExercise JSON object in the request body
    axios.post('http://localhost:3000/exercises/add', newExercise)
      .then(res => console.log(res.data));

    //reset exercise state back to blank 
    this.setState({
      exercise: ''
    })
  }

  render() {
    //create exercise form
    return (
      <div>
        <h3>Create New Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Exercise: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.exercise}
                onChange={this.onChangeExercise}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Exercise" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}