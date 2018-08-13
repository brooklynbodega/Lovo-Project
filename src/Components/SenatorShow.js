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
      votes: [],
      statements: []
    })
  }

  componentDidMount() {
    // Upload the function to display a single senator's information
    let senator = this.props.member.replace('.json', '');
    console.log(senator);
    // let congress = this.props.member.replace('.json', '');
    // console.log(congress);
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
      .then(fetch(`https://api.propublica.org/congress/v1/members/${senator}/statements/115.json`, {
        headers: {
          ['X-API-Key']: api_keys.PROPUB_CONG_KEY
        }
      })
        .then(response => response.json())
        .then(senatorStatements => this.setState({
          statements: senatorStatements.results
        })))
  }

  renderVotes() {
    return (
      this.state.votes.map(vote => {
      return (
        <div className="VoteData">
        <p>{vote.description}</p>
        <p>{vote.date}</p>
         Result: {vote.result} Yeas: {vote.total.yes} Nays: {vote.total.no}
        {vote.position === 'Yes' ?
        <p class="VotePosition">{this.state.senator.first_name} voted yes 👍</p> :
        <p class="VotePosition">{this.state.senator.first_name} voted no 👎</p> }
        </div>
      )
    }))

  }
  
  renderStatements() {
    return (
      this.state.statements.map(statement => {
      return (
        <div className="StatementData">
        <p>{statement.title}</p>
        <p>{statement.date}</p>
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
    let statements = this.state.statements;
    console.log(statements);
    
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
        <div className="SenatorImage">
          <img alt={senator.id} src={`http://bioguide.congress.gov/bioguide/photo/${this.props.member.replace('.json', '').charAt(0)}/${this.props.member.replace('.json', '')}.jpg`} />
        </div>
        {/* Ryan also assisted in putting my roles to the page */}
        {
        (roles !== null) && (
          <div className="SenatorDetails">
            <h3>
            {senator.first_name} {senator.last_name} ({senator.current_party}-{roles.state})</h3>
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
            <p>
            <SocialIcon url={`https://facebook.com/${senator.facebook_account}`} />
            </p>
          </div>
          </div>)
      }
      </div>
      <h3>Vote Positions</h3>
      <div className="VoteShow">
        {this.renderVotes()}
      </div>
      <h3>Statements</h3>
      <div className="StatementShow">
        {this.renderStatements()}
      </div>
      </div>
    )
  }
}

export default SenatorShow;