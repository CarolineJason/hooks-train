import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';

function App() {
  useEffect(() => {
    fetch('/rest')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data:', data);
      })
  })

  return (
    <div className="App">
      火车票
    </div>
  );
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState,mapDispatch)(App);
