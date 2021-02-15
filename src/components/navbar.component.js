import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      //navbar from bootstrap documentation  
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Anojan's Workout Logger</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Workout Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Log Entry</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}