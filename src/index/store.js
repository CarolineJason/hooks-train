import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(
  combineReducers(reducer),
  {
    // state 的默认值
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false, // 城市 弹窗 打开 关闭 状态
    currentSelectingLeftCity: false, // 起点站 是否 有值
    cityData: null, // 城市数据
    departDate: Date.now(), // 日期选择
    isLoadingCityData: false, // 是否正在 加载 城市列表
    isDateSelectorVisible: false, // 日期选择 弹窗 是否打开
    highSpeed: false, // 是否选择了 只看高铁动车
  },
  applyMiddleware(thunk)
);

export default store;
