import React, { Component } from 'react';
import '../App.css';

class Bills extends Component {
constructor(props) {
  super(props)
  this.state = {
     bills: ""
  }
}

componentDidMount() {
  
}

 render () {
    return (
      <div className="Bills">
        <p>This section is under construction and will arrive soon 🏗 ...</p>
        <p>Expect to see a list of bills brought to the floors of Congress and the Senate, with individal pages for more detailed information per each bill.</p>
        <p>2018</p>
      </div>
    );
  }
}

export default Bills;