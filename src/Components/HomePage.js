import React, { Component } from 'react';
import SearchForm from './SearchForm';
import '../App.css';

class HomePage extends Component {
 render () {
    return (
      <div className="HomePage">
        <div className="main">
        {/* create function here to save address to state */}
          <SearchForm onFormSubmit={(address) => {}} />
        </div>
      </div>
    );
  }
}

export default HomePage;
