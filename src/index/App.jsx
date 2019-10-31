import React,{ useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import Header from '../common/header';
import Journey from './journey/index';
import DedatePart from './dePartDate';
import HighSpeed from './highSpeed';
import Submit from './submit';

import './App.css';

function App() {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="App">
      <Header onBack={onBack} title="火车票" />
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
