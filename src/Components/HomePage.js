import React, { Component } from 'react';
import SearchFormLocal from './SearchFormLocal';
import '../App.css';

class HomePage extends Component {
 render () {
    return (
      <div className="HomePage">
        <div className="main">
        {/* create function here to save address to state */}
          <SearchFormLocal onFormSubmit={(address) => {}} />
        </div>
      </div>
    );
  }
}

export default HomePage;