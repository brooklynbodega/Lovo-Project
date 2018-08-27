import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class Header extends Component {
  render () {
    return (
  <div className="Header">
    <header>
      <h1>L o V o</h1>
      <h4>The information hub for the local voter</h4>
      </header>
      <div className="NavBar">
        <Link to='/find-local-reps' >
        <button>Search</button>
        </Link><span> </span>
        <Link to='/senators' >
        <button>All Senators</button>
        </Link><span> </span>
        <Link to='/representatives' >
        <button>All House Representatives</button>
        </Link><span> </span>
        <Link to='/expenses' >
        <button>Quarterly Expenses</button>
        </Link><span> </span>
        <Link to='/bills' >
        <button>Bills</button>
        </Link>
      </div>
    </div>
  )}
}

export default Header;