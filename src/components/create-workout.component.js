import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateWorkout extends Component {
  constructor(props) {
    super(props);

    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onChangeSets = this.onChangeSets.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      exercise: '',
      description: '',
      sets: 0,
      date: new Date(),
      exercises: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/exercises/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            exercises: response.data.map(exercise => exercise.exercise),
            exercise: response.data[0].exercise
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeExercise(e) {
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
    e.preventDefault();

    const workout = {
      exercise: this.state.exercise,
      description: this.state.description,
      sets: this.state.sets,
      date: this.state.date
    }

    console.log(workout);

    axios.post('http://localhost:3000/workouts/add', workout)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
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