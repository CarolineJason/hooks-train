import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { dateTransform } from '../common/fp';

import Header from '../common/header';
import Detail from '../common/Detail/Detail';
import Candidate from './Candidate';
import Schdelu from './Schdelu';

import './App.css';

import {
  setDepartDate,
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setSearchParsed,
} from './action';

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props;

  useEffect(() => {
    console.log(1);
    const queries = URI.parseQuery(window.location.search);
    const {
      date,
      trainNumber,
      aStation,
      dStation,
    } = queries;
    console.log('queries:', queries);
    dispatch(setDepartDate(dateTransform(dayjs(date).valueOf())));
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSearchParsed(true));
  }, []);
 
  // 返回 按钮
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  console.log('trainNumber:', trainNumber);
  
  return (
    <div className="App">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    state
  }
}

const mapDispatch = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapState,mapDispatch)(App);
