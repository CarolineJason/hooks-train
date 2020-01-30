import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(
  combineReducers(reducer),
  {
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    departStation: null,
    arriveStation: null,
    trainNumber: null,
    durationStr: null,
    tickets: [],
    isScheduleVisible: false,
    searchParsed: false,
  },
  applyMiddleware(thunk)
);

export default store;
