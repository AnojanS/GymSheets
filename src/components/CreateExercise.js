import React, { Component } from 'react';
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      exercise: ''
    }
  }

  onChangeExercise(e) {
    this.setState({
      exercise: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newExercise = {exercise: this.state.exercise}
    console.log(newExercise);

    axios.post('http://localhost:3000/exercises/add', newExercise)
      .then(res => console.log(res.data));

    this.setState({
      exercise: ''
    })
  }

  render() {
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