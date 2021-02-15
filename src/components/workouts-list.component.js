import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Workout = props => (
  <tr>
    <td>{props.workout.date.substring(0,10)}</td>
    <td>{props.workout.username}</td>
    <td>{props.workout.sets}</td>
    <td>{props.workout.description}</td>
    <td>
      <Link to={"/edit/"+props.workout._id}>edit</Link> | <a href="#" onClick={() => { props.deleteWorkout(props.workout._id) }}>delete</a>
    </td>
  </tr>
)

export default class WorkoutsList extends Component {
  constructor(props) {
    super(props);
    this.deleteWorkout = this.deleteWorkout.bind(this)
    this.state = {workouts: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3000/workouts/')
      .then(response => {
        this.setState({ workouts: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteWorkout(id) {
    axios.delete('http://localhost:3000/workouts/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      workouts: this.state.workouts.filter(el => el._id !== id)
    })
  }

  workoutList() {
    return this.state.workouts.map(currentworkout => {
      return <Workout workout={currentworkout} deleteWorkout={this.deleteWorkout} key={currentworkout._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Workouts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Username</th>
              <th>Number of Sets</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.workoutList() }
          </tbody>
        </table>
      </div>
    )
  }
}