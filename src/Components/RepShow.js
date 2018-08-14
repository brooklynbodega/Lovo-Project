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
      votes: [],
      statements: [],
      bills: []
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
        .then(representativeVotes => this.setState({
          votes: representativeVotes.results[0].votes
        })))
        .then(fetch(`https://api.propublica.org/congress/v1/members/${representative}/statements/115.json`, {
            headers: {
              ['X-API-Key']: api_keys.PROPUB_CONG_KEY
            }
          })
          .then(response => response.json())
          .then(representativeStatements => this.setState({
            statements: representativeStatements.results
          })))
          .then(fetch(`https://api.propublica.org/congress/v1/members/${representative}/bills/introduced.json`, {
              headers: {
                ['X-API-Key']: api_keys.PROPUB_CONG_KEY
              }
            })
            .then(response => response.json())
            .then(bills => this.setState({
              bills: bills.results
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
        <p class="VotePosition">{this.state.representative.first_name} voted yes 👍</p> :
        <p class="VotePosition">{this.state.representative.first_name} voted no 👎</p> }
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
 
  renderBills() {
      if (this.state.bills === true) {
        this.state.bills.map(bill => {
          return (
          <div className="BillData">
          <p>{bill.short_title} {bill.number}</p>
          <p>{bill.introduced_date}</p>
          <p>{bill.primary_subject}</p>
          </div>
          )})
        }
        else {
          return (
            <div className="BillData">
              <p>{this.state.representative.first_name} {this.state.representative.last_name} has not introduced any bills.</p>
            </div>
          )
        }
  }
  render() {
    let representative = this.state.representative;
    let roles = this.state.roles;
    console.log(roles);
    let votes = this.state.votes;
    console.log(votes);
    let statements = this.state.statements;
    console.log(statements);
    let bills = this.state.bills;
    console.log(bills);

    return (
      <div className="RepShow">
        {/* Ryan assisted with rendering my representatives to the page */}
        <div className="RepContainer">
          <div className="RepImage">
            <img alt={representative.id} src={`http://bioguide.congress.gov/bioguide/photo/${this.props.member.replace('.json', '').charAt(0)}/${this.props.member.replace('.json', '')}.jpg`} />
          </div>
          {/* Ryan also assisted in putting my roles to the page */}
          {
            (roles !== null) && (
              <div className="RepDetails">
          <h3>
          {representative.first_name} {representative.last_name} ({representative.current_party}-{roles.state})
          </h3>
                <p>{roles.title}</p>
                <p>{roles.phone}</p>
                <div className="icons">
                <p>
                  <SocialIcon url={`${roles.contact_form}`} />
                </p>
                <p>
                  <SocialIcon url={`https://twitter.com/${representative.twitter_account}`} />
                </p>
                <p>
                  <SocialIcon url={`https://facebook.com/${representative.facebook_account}`} />
                </p>
                </div>
              </div>)
          }
        </div>
        <div className="FeedContainer">
          <div id="VoteContainer">
            <h3 id="VoteTitle" className="FeedTitle">Vote Positions</h3>
            <div id="VoteFeed" className="Feed">
              {this.renderVotes()}
            </div>
          </div>
          <div id="StatementContainer">
          <h3 id="StatementTitle" className="FeedTitle">Statements</h3>
          <div id="StatementFeed" className="Feed">
            {this.renderStatements()}
          </div>
         </div>
         <div id="BillContainer">
          <h3 id="BillTitle" className="FeedTitle">Bills</h3>
          <div id="BillFeed" className="Feed">
            {this.renderBills()}
         </div>
         </div>
        </div>
      </div>
    )
  }
}

export default RepShow;