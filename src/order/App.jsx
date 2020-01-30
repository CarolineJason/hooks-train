import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import Header from '../common/header';
import Account from './Account';
import Ticket from './Ticket';
import Choose from './Choose';
import Passengers from './Passengers';
import Detail from '../common/Detail/Detail';
import Menu from './Menu';

import { dateTransform } from '../common/fp';

import {
  setDepartStation,
  setArriveStation,
  setDepartDate,
  setTrainNumber,
  setSeatType,
  setSearchParsed,
  fetchInital,
  createAdult,
  createChild,
  removePassenger,
  updatePassenger,
  hideMenu,
  showGenderMenu,
  showFollowAdule,
  showTicketTypeMenu,
} from './action';

import './App.css';
import '../index/iconfont/iconfont.css';

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    date,
    seatType,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch,
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const {
      type,
      departDate,
      trainNumber,
      arriveStation,
      departStation,
    } = queries;

    console.log('queryies:', queries);

    dispatch(setDepartStation(departStation));
    dispatch(setArriveStation(arriveStation));
    dispatch(setDepartDate(dateTransform(dayjs(departDate).valueOf())));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSeatType(type));
    dispatch(setSearchParsed(true));
  }, [dispatch]);

  // 创建 请求 url
  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/order')
      .setSearch('aStation', arriveStation)
      .setSearch('dStation', departStation)
      .setSearch('seatType', seatType)
      .setSearch('date', dayjs(date).format('YYYYY-MM-DD'))
      .toString();

    dispatch(fetchInital(url));
  }, [searchParsed, arriveStation, departStation, seatType, date, dispatch]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  if (!searchParsed) {
    return null;
  }

  // const dispatchToggleIsScheduleVisible = () => {
  //   dispatch(toggleIsScheduleVisible());
  // }

  const dispatchCreateAdult = () => {
    dispatch(createAdult());
  };

  const dispatchCreateChild = () => {
    dispatch(createChild());
  };

  const dispatchRemovePassenger = () => {
    dispatch(removePassenger());
  };

  const dispatchUpdatePassenger = (id, data) => {
    dispatch(updatePassenger(id, data));
  };

  const dispatchHideMenu = flag => {
    dispatch(hideMenu(flag));
  };

  const dispatchShowGenderMenu = id => {
    console.log('id:', id);
    dispatch(showGenderMenu(id));
  };

  const dispatchShowFollowAdule = id => {
    dispatch(showFollowAdule(id));
  };

  const dispatchShowTicketTypeMenu = id => {
    dispatch(showTicketTypeMenu(id));
  };

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title="订单填写" onBack={onBack} />
      </div>
      <div className="detail-wrapper">
        <Detail
          departDate={date}
          arriveDate={arriveDate}
          departStation={departStation}
          arriveStation={arriveStation}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          durationStr={durationStr}
        >
          <span style={{ display: 'block' }} className="train-icon"></span>
        </Detail>
        <Ticket type={seatType} price={price} />
        <Passengers
          passengers={passengers}
          createAdult={dispatchCreateAdult}
          createChild={dispatchCreateChild}
          removePassenger={dispatchRemovePassenger}
          updatePassenger={dispatchUpdatePassenger}
          showGenderMenu={dispatchShowGenderMenu}
          showFollowAdule={dispatchShowFollowAdule}
          showTicketTypeMenu={dispatchShowTicketTypeMenu}
        />
        {passengers.length > 0 && (
          <Choose
            passengers={passengers}
            updatePassenger={dispatchUpdatePassenger}
          />
        )}
        <Account price={price} length={passengers.length} />
        <Menu {...menu} show={isMenuVisible} hideMenu={dispatchHideMenu} />
      </div>
    </div>
  );
}

const mapState = state => {
  return state;
};

const mapDispatch = dispatch => {
  return {
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(App);
