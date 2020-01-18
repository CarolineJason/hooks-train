import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';


const store = createStore(
  combineReducers(reducer),
  {
    trainNumber: null,
    departStation:null,
    arriveStation: null,
    date: Date.now(),
    seatType: null,
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    durationStr: null,
    price: null,
    passengers: [],
    menu: null,
    isMenuVisible: false,
    searchParsed: false,
  },
  applyMiddleware(thunk)
  
);

export default store;
