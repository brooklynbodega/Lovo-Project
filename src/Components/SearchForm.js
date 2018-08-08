import React, { Component } from 'react';
import '../App.css';

/* 
The code for http: //myreps.datamade.us/index.html assisted me with the setup of this search class,
specifically Lines 18-20 and 42-57.
*/

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      representatives: [],
      address: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderRepresentatives = this.renderRepresentatives.bind(this);
  }
  
  // Change adress from empty string to the input from the user
  onInputChange(evt) {
    this.setState({
      address: evt.target.value
    })
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDvayFdES8XW6Av7EdLUGVqO9x8RZyqAhI&address=${this.state.address}`)
      .then(response => response.json())
      .then(representativeData => {
        this.setState({
          representatives: representativeData
        })
      })
  }

  // Original mapping function
  renderRepresentatives() {
    if (this.state.representatives.officials) {
      return (
        <div className = "LocalRepData">
          {this.state.representatives.officials.map(x => {
            return ( 
            <div className="EachRep">
              <h3> {x.name} </h3>
              <p> {x.party} </p>
            </div>
          )
          })}
      </div>
      )
    } else {
      return null;
    }
  }

  render() {
      
    return (
      <div className="SearchForm">
        <div className="input-address">
          <form onSubmit={this.onFormSubmit}>
            <input onChange={this.onInputChange} value={this.state.address} name="address" placeholder="Enter Address"></input>
            <p>
              <input className="form-btn" type="button" type="submit"></input>
            </p>
          </form>
        </div>
        <div className="LocalRepContainer">
        {/* SAVE ADDRESS TO STATE BY PUTTING RESULTS IN A DIFFERENT COMPONENT */}
        {this.renderRepresentatives()}
        </div>
      </div>
    );
  }
}

export default SearchForm;
