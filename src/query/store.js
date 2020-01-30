import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

import { dateTransform } from '../common/fp';
import { ORDER_DEPART } from './constant';

const store = createStore(
  combineReducers(reducer),
  {
    from: null, //起点站
    to: null, //终点站
    departDate: dateTransform(Date.now()), //当前时间，去掉时分秒
    highSpeed: false, // 高铁动车
    trainList: [], // 车次列表
    orderType: ORDER_DEPART, // 出发类型，（早到完，耗时短到长）
    onlyTickets: false, //只看有票
    ticketTypes: [], // 所有备选项
    checkedTicketsTypes: {}, // 选中的选项
    trainTypes: [], // 车次类型
    checkedTrainTypes: {}, //选中的车次类型
    departStations: [], // 出发车站
    checkedDepartStations: {}, //选中的出发车站
    arriveStations: [], // 到达车站
    checkedArriveStations: {}, //选中的到达车站
    departTimeStart: 0, // 出发时间起始点
    departTimeEnd: 24, // 到达时间 结束点
    arriveTimeStart: 0, //出发时间 起始点
    arriveTimeEnd: 24, // 出发时间 结束点
    isFiltersVisible: false, // 弹窗
    searchParsed: false, // 地址栏参数 是否已经解析完成，解析完成之后才开始请求数据
  },
  applyMiddleware(thunk)
);

export default store;
