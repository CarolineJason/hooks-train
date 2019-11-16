import React,{ useCallback } from 'react';
import { connect } from 'react-redux';

import Header from '../common/header';
import Journey from './journey/index';
import DedatePart from './dePartDate/dePartDate';
import HighSpeed from './highSpeed';
import Submit from './submit';
import CitySelector from '../common/citySelector/citySelector';
import DateSelector from '../common/dateSelector/DateSelector';

import {
  showCitySelector,
  exchangeFromTo,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
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
    isDateSelectorVisible,
    isLoadingCityData,
    cityData,
    dispatchHideCitySelector,
    dispatchFetchCityData,
    dispatchCitySelect,
    departDate,
    dispatchShowDateSelector,
    dispatchHideDateSelector,
  } = props;

  // 返回 按钮
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // 父组件 向 子组件 传递 事件，用useCallback() 包裹起来， 提高渲染性能，防止 子组件其他属性 改变渲染多过程中 会再次 渲染该事件
  const doShowCityelector = useCallback((flag) => {
    dispatchShowCityelector(flag);
  }, []);

  // 交换 城市 起始站  和 终点站
  const doExchangeFromTo = useCallback(() => {
    dispatchExchangeFromTo();
  }, []);

  // 隐藏 城市 列表
  const doHideCitySelector = useCallback(() => {
    dispatchHideCitySelector(false);
  });

  // 请求城市 列表数据
  const doFetchCityData = useCallback(() => {
    dispatchFetchCityData();
  }, []);
  
  // 城市 选择
  const doCitySelect = useCallback((city) => {
    console.log('选择了....:', city);
    dispatchCitySelect(city);
  }, []);

  // 关闭 日期 弹窗 
  const doHideDateSelector = useCallback(() => {
    dispatchHideDateSelector();
  }, []);

  // 日期时间选择
  const doOnTimeSelect = useCallback(() => {
    dispatchShowDateSelector();
  }, []);

  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票" />
      </div>

      {/* 起点站 -- 终点站 浮层 */}
      <form className="form" action="">
        <Journey
          from={from}
          to={to}
          showCitySelector={doShowCityelector}
          exchangeFromTo={doExchangeFromTo}
        />
        <DedatePart
          time={departDate}
          onTimeSelect={doOnTimeSelect}
        />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        isLoading={isLoadingCityData}
        cityData={cityData}
        onBack={doHideCitySelector}
        fetchCityData={doFetchCityData}
        onCitySelect={doCitySelect}
      />
      
      {/* 日期选择 浮层 */}
      <DateSelector
        DateSelectorShow={isDateSelectorVisible}
        onBack={doHideDateSelector}
      />
    </div>
  );
}

const mapState = (state) => {
  console.log('state:', state);
  return {
    from: state.from,
    to: state.to,
    isCitySelectorVisible: state.isCitySelectorVisible,
    cityData: state.cityData,
    isLoadingCityData: state.isLoadingCityData,
    departDate: state.departDate,
    isDateSelectorVisible: state.isDateSelectorVisible,
  }
}

const mapDispatch = (dispatch) => {
  // console.log('dispatch:', dispatch);
  return {
    dispatchShowCityelector(flag) { // 打开 城市选择浮层
      dispatch(showCitySelector(flag));
    },
    dispatchExchangeFromTo(){ // 终点站 和 起点站 切换
      dispatch(exchangeFromTo());
    },
    dispatchHideCitySelector(flag) {// 关闭 城市选择浮层
      dispatch(hideCitySelector(flag));
    },
    dispatchFetchCityData() { // 请求城市 列表数据
      console.log('dispatchFetchCityData');
      dispatch(fetchCityData());
    },
    dispatchCitySelect(city) { // 城市 选择
      dispatch(setSelectedCity(city));
    },
    dispatchShowDateSelector() { // 打开 日期 选择 浮层
      console.log('日期选择浮层。。。。。');
      dispatch(showDateSelector());
    },
    dispatchHideDateSelector() { // 关闭 日期 选择 浮层
      dispatch(hideDateSelector);
    }
  }
}

export default connect(mapState,mapDispatch)(App);
