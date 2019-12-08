import React from 'react';
import { connect } from 'react-redux';
import DateNav from '../common/dateNav/DateNav';
import List from './List/List';
import BottomSelect from './BottomSelect/BottomSelect';
import './App.scss';

function App(props) {
  return (
    <div className="App">
      <DateNav />
      <List />
      <BottomSelect />
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
