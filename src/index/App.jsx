import React,{ useCallback } from 'react';
import { connect } from 'react-redux';

import Header from '../common/header';
import Journey from './journey/index';
import DedatePart from './dePartDate';
import HighSpeed from './highSpeed';
import Submit from './submit';
import CitySelector from '../common/citySelector/citySelector';

import {
  showCitySelector,
  exchangeFromTo,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
} from './action';

import './App.scss';
import './iconfont/iconfont.css';

function App(props) {
  const {
    from,
    to,
    dispatchShowCityelector,
    dispatchExchangeFromTo,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData,
    dispatchHideCitySelector,
    dispatchFetchCityData,
    dispatchCitySelect,
    
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // 父组件 向 子组件 传递 事件，用useCallback() 包裹起来， 提高渲染性能，防止 子组件其他属性 改变渲染多过程中 会再次 渲染该事件
  const doShowCityelector = useCallback((flag) => {
    dispatchShowCityelector(flag);
  }, []);

  const doExchangeFromTo = useCallback(() => {
    dispatchExchangeFromTo();
  }, []);

  const doHideCitySelector = useCallback(() => {
    dispatchHideCitySelector(false);
  });

  const doFetchCityData = useCallback(() => {
    dispatchFetchCityData();
  }, []);
  
  const doCitySelect = useCallback((city) => {
    console.log('选择了....:', city);
    dispatchCitySelect(city);
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
          showCitySelector={doShowCityelector}
          exchangeFromTo={doExchangeFromTo}
        />
        <DedatePart />
        <HighSpeed />
        <Submit />
        <CitySelector
          show={isCitySelectorVisible}
          isLoading={isLoadingCityData}
          cityData={cityData}
          onBack={doHideCitySelector}
          fetchCityData={doFetchCityData}
          onCitySelect={doCitySelect}
        />
      </form>
    </div>
  );
}

const mapState = (state) => {
  // console.log('state:', state);
  return {
    from: state.from,
    to: state.to,
    isCitySelectorVisible: state.isCitySelectorVisible,
    cityData: state.cityData,
    isLoadingCityData: state.isLoadingCityData,
  }
}

const mapDispatch = (dispatch) => {
  // console.log('dispatch:', dispatch);
  return {
    dispatchShowCityelector(flag) {
      dispatch(showCitySelector(flag));
    },
    dispatchExchangeFromTo(){
      dispatch(exchangeFromTo());
    },
    dispatchHideCitySelector(flag) {
      dispatch(hideCitySelector(flag));
    },
    dispatchFetchCityData() {
      console.log('dispatchFetchCityData');
      dispatch(fetchCityData());
    },
    dispatchCitySelect(city) {
      dispatch(setSelectedCity(city));
    }
  }
}

export default connect(mapState,mapDispatch)(App);
