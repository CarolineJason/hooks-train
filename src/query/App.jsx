import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import URI from 'urijs';
import dayjs from 'dayjs';
import { dateTransform } from '../common/fp';
import useNav from '../common/useNav';

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
  prevDate,
  nextDate,
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,

  setCheckedTicketsTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,
  
} from './action';

import Header from '../common/header'
import DateNav from '../common/dateNav/DateNav';
import List from './List/List';
import BottomSelect from './BottomSelect/BottomSelect';
import './App.scss';
import './iconfont/iconfont.css';

function App(props) {
  const {
    trainList,
    to,
    from,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    isFiltersVisible,

    // 第四个 tab 筛选浮层
    ticketType,
    trainType,
    depStation,
    arrStation,
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
                  arriTimeRange,
                  deptTimeRange,
                  station,
                  stationType,
                }
              }
            }
          } = resp;

          dispatch(setTrainList(trains));
          dispatch(setTicketTypes(ticketType));
          dispatch(setTrainTypes(trainType));
          dispatch(setDepartStations(depStation));
          dispatch(setArriveStations(arrStation));
        });
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

  const {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  } = useNav(departDate, dispatch, prevDate, nextDate);

  // 给bottom 组件 传 事件
  const dispatchToggleOrderType = useCallback(() => {
    dispatch(toggleOrderType());
  }, []);
  const dispatchToggleHighSpeed = useCallback(() => {
    dispatch(toggleHighSpeed());
  }, []);
  const dispatchToggleOnlyTickets = useCallback(() => {
    dispatch(toggleOnlyTickets());
  }, []);
  const dispatchToggleIsFiltersVisile = useCallback(() => {
    dispatch(toggleIsFiltersVisible());
  }, []);

  return (
    <div className="App">
      <div className="header-wrapper">
        <Header title={`${from} ➡ ${to}`} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <DateNav
          date={departDate}
          prev={prev}
          next={next}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
        />
      </div>
      <List list={trainList} />
      
      <BottomSelect
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        toggleOrderType={dispatchToggleOrderType}
        toggleHighSpeed={dispatchToggleHighSpeed}
        toggleOnlyTickets={dispatchToggleOnlyTickets}
        toggleIsFiltersVisible={dispatchToggleIsFiltersVisile}
        ticketTypes={ticketType} // 第四个筛选 弹窗 数据
        trainTypes={trainType}
        depStations={depStation}
        arrStations={arrStation}
        checkedTicketsTypes={checkedTicketsTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        />
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
