import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import api_keys from '../config';
import '../App.css';

/* 
Some code lifted from https: //github.com/yungpanko/congressbook:
i.e. General syntax for the API fetch calls on "representative" and "votes",
Vote information from lines 54 to 57
*/

class RepShow extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      representative: '',
      roles: null,
      votes: []
    })
  }

  componentDidMount() {
    // Upload the function to display a single representative's information
    let representative = this.props.member.replace('.json', '');
    console.log(representative);
    fetch(`https://api.propublica.org/congress/v1/members/${representative}.json`, {
      headers: {
        ['X-API-Key']: api_keys.PROPUB_CONG_KEY
      }
    })
      .then(response => (response.json()))
      .then(representativeData => this.setState({
        representative: representativeData.results[0],
        roles: representativeData.results[0].roles[0]
      }))
      .then(fetch(`https://api.propublica.org/congress/v1/members/${representative}/votes.json`, {
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
        <p class="votePosition">{this.state.representative.first_name} voted yes 👍</p> :
        <p class="votePosition">{this.state.representative.first_name} voted no 👎</p> }
        </div>
      )
    }))
  }

  render() {
    let representative = this.state.representative;
    let roles = this.state.roles;
    console.log(roles);
    let votes = this.state.votes;
    console.log(votes);

    return (
      <div className="RepShow">
        {/* Ryan assisted with rendering my representatives to the page */}
        <div className="RepresentativeContainer">
          <img alt={representative.id} className='representativeImage' src={`http://bioguide.congress.gov/bioguide/photo/${this.props.member.replace('.json', '').charAt(0)}/${this.props.member.replace('.json', '')}.jpg`} />
          <h3>{representative.first_name} {representative.last_name}</h3>
          <p>{representative.current_party}</p>
          <p>{representative.title}</p>
          {/* Ryan also assisted in putting my roles to the page */}
          <p>{
            (roles !== null) && (
              <div>
                <p>{roles.state}</p>
                <p>{roles.title}</p>
                <p>{roles.phone}</p>
                <div className="icons">
                <p><SocialIcon url={`${roles.contact_form}`} />
                </p>
                <p>
                  <SocialIcon url={`https://twitter.com/${representative.twitter_account}`} />
                </p>
                <p>
                  <SocialIcon url={`https://facebook.com/${representative.facebook_account}`} />
                </p>
                </div>
              </div>)
          }</p>
        </div>
        <div className="voteShow">
          {this.renderVotes()}
        </div>
      </div>
    )
  }
}

export default RepShow;