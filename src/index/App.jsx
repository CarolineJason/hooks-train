import React,{ useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import Header from '../common/header';
import Journey from './journey/index';
import DedatePart from './dePartDate';
import HighSpeed from './highSpeed';
import Submit from './submit';

import './App.scss';

function App(props) {
  const {
    from,
    to,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票" />
      </div>
      <form className="form" action="">
        <Journey
          from={from}
          to={to}
        />
        <DedatePart />
        <HighSpeed />
        <Submit />
      </form>
    </div>
  );
}

const mapState = (state) => {
  console.log('state:', state);
  return {
    from: state.from,
    to: state.to,
  }
}

const mapDispatch = (dispatch) => {
  console.log('dispatch:', dispatch);
  return {

  }
}

export default connect(mapState,mapDispatch)(App);
