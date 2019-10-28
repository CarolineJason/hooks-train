import React from 'react';
import { connect } from 'react-redux';

import Header from '../common/header/index';
import Journey from './journey/index';
import DedatePart from './dePartDate/index';
import HighSpeed from './highSpeed/index';
import Submit from './submit/index';


import './App.css';

function App() {
  return (
    <div className="App">
      火车票
      <Header />
      <Journey />
      <DedatePart />
      <HighSpeed />
      <Submit />
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
