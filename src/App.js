import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import WorkoutsList from "./components/WorkoutsList";
import EditWorkout from "./components/EditWorkout";
import CreateWorkout from "./components/CreateWorkout";
import CreateExercise from "./components/CreateExercise";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={WorkoutsList} />
      <Route path="/edit/:id" component={EditWorkout} />
      <Route path="/create" component={CreateWorkout} />
      <Route path="/exercise" component={CreateExercise} />
      </div>
    </Router>
  );
}

export default App;
