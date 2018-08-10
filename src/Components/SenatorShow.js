import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import api_keys from '../config';
import '../App.css';

/* 
Some code lifted from https: //github.com/yungpanko/congressbook:
i.e. General syntax for the API fetch calls on "senator" and "votes",
Vote information from lines 54 to 57
*/

class SenatorShow extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      senator: '',
      roles: null,
      votes: []
    })
  }

  componentDidMount() {
    // Upload the function to display a single senator's information
    let senator = this.props.member.replace('.json', '');
    console.log(senator);
    fetch(`https://api.propublica.org/congress/v1/members/${senator}.json`, {
        headers: {
          ['X-API-Key']: api_keys.PROPUB_CONG_KEY
        }
      })
      .then(response => (response.json()))
      .then(senatorData => this.setState({
        senator: senatorData.results[0],
        roles: senatorData.results[0].roles[0]
      }))
      .then(fetch(`https://api.propublica.org/congress/v1/members/${senator}/votes.json`, {
        headers: {
          ['X-API-Key']: api_keys.PROPUB_CONG_KEY
        }
      })
        .then(response => response.json())
        .then(senatorVotes => this.setState({
          votes: senatorVotes.results[0].votes
        })))
  }

  renderVotes() {
    return (
      this.state.votes.map(vote => {
      return (
        <div className="voteData">
        <p>{vote.description}</p>
        <p>{vote.date}</p>
         Result: {vote.result} Yeas: {vote.total.yes} Nays: {vote.total.no}
        {vote.position === 'Yes' ?
        <p class="votePosition">{this.state.senator.first_name} voted yes 👍</p> :
        <p class="votePosition">{this.state.senator.first_name} voted no 👎</p> }
        </div>
      )
    }))
  }

  render() {
    let senator = this.state.senator;
    let roles = this.state.roles;
    console.log(roles);
    let votes = this.state.votes;
    console.log(votes);
    
    // An attempt to render "Republican" or "Democrat" instead of "D" or "R"
    // if (senator.current_party == "D") {
    //   return "Democrat"
    // } else if (senator.current_party == "R") {
    //   return "Republican"
    // }
    
    return (
      <div className="SenatorShow">
      {/* Ryan Hikel assisted with rendering my senator image to the page */}
      <div className="SenatorContainer">
        <div className='SenatorImage'>
        <img alt={senator.id} src={`http://bioguide.congress.gov/bioguide/photo/${this.props.member.replace('.json', '').charAt(0)}/${this.props.member.replace('.json', '')}.jpg`} />
        </div>
      <p></p>
        {/* Ryan also assisted in putting my roles to the page */}
      <p>{
        (roles !== null) && (
          <div>
            <h3>{senator.first_name} {senator.last_name} ({senator.current_party}-{roles.state})</h3>
          <p>{roles.title}</p>
          <p>{roles.phone}</p>
          <div className="icons">
            <p>
              <SocialIcon url={`${roles.contact_form}`} />
            {/* <a href={`${roles.contact_form}`} target="_blank"><p>Contact Form</a> */}
            </p>
            <p>
              <SocialIcon url={`https://twitter.com/${senator.twitter_account}`} />
            </p>
            {/* Twitter: <a href={`https://twitter.com/${senator.twitter_account}`} target="_blank">@{senator.twitter_account}</a> */}
            <p>
            <SocialIcon url={`https://facebook.com/${senator.facebook_account}`} />
            </p>
            {/* Facebook: <a href={`https://facebook.com/${senator.facebook_account}`} target="_blank">{senator.facebook_account}</a> */}
          </div>
          </div>)
      }</p>
      </div>
      <div className="voteShow">
        {this.renderVotes()}
        {/* <p>{votes.description}</p> */}
      </div>
      </div>
    )
  }
}

export default SenatorShow;