import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import URI from 'urijs';
import dayjs from 'dayjs';
import { dateTransform } from '../common/fp';

// 引入 action
import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
} from './action';

import Header from '../common/header'
import DateNav from '../common/dateNav/DateNav';
import List from './List/List';
import BottomSelect from './BottomSelect/BottomSelect';
import './App.scss';

function App(props) {
  const {
    to,
    from,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketsTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    dispatch, // 从 props 中 引入 dispatch
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    
    const queries = URI.parseQuery(window.location.search);
    const { from, to, date, highSpeed } = queries;
    console.log('queries:', queries);
    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDepartDate(dateTransform(dayjs(date).valueOf())));
    dispatch(setHighSpeed(highSpeed === 'true'));
    dispatch(setSearchParsed(true));
  }, []);

  useEffect(() => {
    if (!searchParsed) {
      return;
    } else {
      // fetch
      const url = new URI('/rest/query')
        .setSearch('from', from)
        .setSearch('to', to)
        .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
        .setSearch('highSpeed', highSpeed)
        .setSearch('orderType', orderType)
        .setSearch('onlyTickets', onlyTickets)
        .setSearch('checkedTicketsTypes', Object.keys(checkedTicketsTypes))
        .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes))
        .setSearch('checkedDepartStations', Object.keys(checkedDepartStations))
        .setSearch('checkedArriveStations', Object.keys(checkedArriveStations))
        .setSearch('departTimeStart', departTimeStart)
        .setSearch('departTimeEnd', departTimeEnd)
        .setSearch('arriveTimeStart', arriveTimeStart)
        .setSearch('arriveTimeEnd', arriveTimeEnd)
        .toString();

      fetch(url)
        .then((response) => response.json())
        .then((resp) => {
          console.log('resp:', resp);
          const {
            dataMap: {
              directTrainInfo: {
                trains,
                filter: {
                  arrStation,
                  depStation,
                  ticketType,
                  trainType,
                }
              }
            }
          } = resp;

          dispatch(setTrainList(trains));
          dispatch(setTicketTypes(ticketType))
          dispatch(setTrainTypes(trainType))
          dispatch(setDepartStations(depStation))
          dispatch(setArriveStations(arrStation))
        })
    }
  }, [
    // 请求数据的 依赖
    to,
    from,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketsTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  ]);

  return (
    <div className="App">
      <div className="header-wrapper">
        <Header title={`${from} => ${to}`} onBack={onBack} />
      </div>
      <DateNav />
      <List />
      <BottomSelect />
    </div>
  );
}

const mapState = (state) => {
  console.log('query...state:', state);
  return state;
}

const mapDispatch = (dispatch) => {
  console.log('query...dispatch:', dispatch);
  return { dispatch }; // 直接返回 dispatch 到 props中
}

export default connect(mapState,mapDispatch)(App);
