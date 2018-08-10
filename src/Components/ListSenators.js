import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api_keys from '../config';
import '../App.css';

/* 
Some code lifted from https: //github.com/yungpanko/congressbook:
Lines 28-30 for the swenators to render,
Line 42 for the image information.
*/

class ListSenators extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allSenators: [],
    }
  this.renderAllSenators = this.renderAllSenators.bind(this);
  }

  // Ehsan assisted me with finding the section of "allSenators"'s value where I could map over an array.
  componentDidMount() {
  fetch(`https://api.propublica.org/congress/v1/115/senate/members.json`, {
    headers: {
      ['X-API-Key']: api_keys.PROPUB_CONG_KEY
    }})
  .then(response => (response.json()))
  .then(senatorData => {
      this.setState({
        allSenators: senatorData.results[0].members.filter(member => member.in_office === true),
      })
  console.log(senatorData.results[0])
  console.log(senatorData.results[0].members)
  })
  }

  renderAllSenators() {
    return (
      this.state.allSenators.map(senator => {
      return (
        <div className="SenatorData">
        <img alt={senator.id} className="SenatorImage" src={`http://bioguide.congress.gov/bioguide/photo/${senator.id.charAt(0)}/${senator.id}.jpg`} />
        <Link to={`senators/${senator.id}.json`}>
          <h3>{senator.first_name} {senator.last_name}</h3>
        </Link>
          <p>{senator.party}</p>
          <p>{senator.title}</p>
          <p>{senator.state}</p>
        </div>
      )
    }))
  }
  
  render() {
    return (
      <div className="ListSenators">
          {this.renderAllSenators()}
      </div>
    );
  }
}


export default ListSenators;
