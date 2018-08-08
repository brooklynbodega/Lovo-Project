import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api_keys from '../config';
import '../App.css';

/* 
Some code lifted from https: //github.com/yungpanko/congressbook:
Lines 28-30 for the swenators to render,
Line 40 for the image information.
*/

class ListHouseReps extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allReps: []
    }
  this.renderAllReps = this.renderAllReps.bind(this);
  }

  componentDidMount() {
  fetch(`https://api.propublica.org/congress/v1/115/house/members.json`, {
    headers: {
      ['X-API-Key']: api_keys.PROPUB_CONG_KEY
    }})
  .then(response => (response.json()))
  .then(representativeData => {
      this.setState({
        allReps: representativeData.results[0].members
      })
  console.log(representativeData.results[0])
  })
  }

  renderAllReps() {
    return this.state.allReps.map(representative => {
      return (
        <div className="repData">
        <img alt={representative.id} className='representativeImage' src={`http://bioguide.congress.gov/bioguide/photo/${representative.id.charAt(0)}/${representative.id}.jpg`} />
          <Link to={`representatives/${representative.id}.json`}>
          <h3>{representative.first_name} {representative.last_name}</h3>
          </Link>
          <p>{representative.party}</p>
          <p>{representative.title}</p>
          <p>{representative.state}</p>
        </div>
      )
    })
  }
  
  render() {
    return (
      <div className="ListHouseReps">
          {this.renderAllReps()}
      </div>
    );
  }
}


export default ListHouseReps;
