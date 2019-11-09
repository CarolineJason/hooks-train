import React,{ useCallback } from 'react';
import { connect } from 'react-redux';

import Header from '../common/header';
import Journey from './journey/index';
import DedatePart from './dePartDate';
import HighSpeed from './highSpeed';
import Submit from './submit';

import { showCityelector, exchangeFromTo } from './action';

import './App.scss';

function App(props) {
  const {
    from,
    to,
    showCityelector,
    exchangeFromTo,
  } = props;

  console.log('app:', props);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // 父组件 向 子组件 传递 事件，用useCallback() 包裹起来， 提高渲染性能，防止 子组件其他属性 改变渲染多过程中 会再次 渲染该事件
  const doShowCityelector = useCallback(() => {
    showCityelector();
  }, []);

  const doExchangeFromTo = useCallback(() => {
    exchangeFromTo();
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
          showCityelector={doShowCityelector}
          exchangeFromTo={doExchangeFromTo}
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
    showCityelector(flag) {
      console.log('showCityelector');
      dispatch(showCityelector(flag));
    },
    exchangeFromTo(){
      console.log('exchangeFromTo');
      dispatch(exchangeFromTo());
    },
  }
}

export default connect(mapState,mapDispatch)(App);
