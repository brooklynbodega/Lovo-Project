import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import ListSenators from './Components/ListSenators';
import ListHouseReps from './Components/ListHouseReps';
import SearchFormLocal from './Components/SearchFormLocal';
import SenatorShow from './Components/SenatorShow';
import Expenses from './Components/Expenses';
import Bills from './Components/Bills';
import RepShow from './Components/RepShow';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Header />
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/find-reps' component={SearchFormLocal}/>
            <Route exact path='/senators' component={ListSenators}/>
            <Route exact path='/representatives' component={ListHouseReps}/>
            <Route exact path='/expenses' component={Expenses}/>
            <Route exact path='/bills' component={Bills}/>
            <Switch>
            <Route path ="/senators/:id" render={({match})=> (<SenatorShow member={match.params.id}/>) }/>
            <Route path ="/representatives/:id" render={({match})=> (<RepShow member={match.params.id}/>) }/>
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
