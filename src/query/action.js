import { ORDER_DUATION, ORDER_DEPART } from "./constant";
import { dateTransform } from '../common/fp';
//定义 各种 actionType
export const ACTION_SET_FROM = 'ACTION_SET_from';
export const ACTION_SET_TO = 'ACTION_SET_TO';
export const ACTION_SET_DEPART_DATE = 'ACTION_SET_DEPARTDATE';
export const ACTION_SET_HIGH_SPEED = 'ACTION_SET_HIGHSPEED';
export const ACTION_SET_TRAIN_LIST = 'ACTION_SET_TRAINLIST';
export const ACTION_SET_ORDER_TYPE= 'ACTION_SET_ORDERTYPE';
export const ACTION_SET_ONLY_TICKETS= 'ACTION_SET_ONLYTICKETS';
export const ACTION_SET_TICKETS_TYPE= 'ACTION_SET_TICKETSTYPE';
export const ACTION_SET_CHECKED_TICKETS_TYPE = 'ACTION_SET_CHECKED_TICKETS_TYPE';
export const ACTION_SET_TRAIN_TYPE = 'ACTION_SET_TRAIN_TYPE';
export const ACTION_SET_CHECKED_TRAIN_TYPE = 'ACTION_SET_CHECKED_TRAIN_TYPE';
export const ACTION_SET_DEPART_STATIONS = 'ACTION_SET_DEPART_STATIONS';
export const ACTION_SET_CHECKED_DEPART_STATIONS = 'ACTION_SET_CHECKED_DEPART_STATIONS';
export const ACTION_SET_ARRIVE_STATIONS = 'ACTION_SET_ARRIVE_STATIONS';
export const ACTION_SET_CHECKED_ARRIVE_STATIONS = 'ACTION_SET_CHECKED_ARRIVE_STATIONS';
export const ACTION_SET_DEPART_TIME_START = 'ACTION_SET_DEPART_TIME_START';
export const ACTION_SET_DEPART_TIME_END = 'ACTION_SET_DEPART_TIME_END';
export const ACTION_SET_ARRIVE_TIME_START = 'ACTION_SET_ARRIVE_TIME_START';
export const ACTION_SET_ARRIVE_TIME_END = 'ACTION_SET_ARRIVE_TIME_END';
export const ACTION_SET_IS_FILTERS_VISIBLE = 'ACTION_SET_IS_FILTERS_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'ACTION_SET_SEARCH_PARSED';


// 定义 action

// 起点站
export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    palaod: from,
  };
};

// 终点站
export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    palaod: to,
  };
};

// 设置 顶部导航 日期
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    palaod: departDate,
  };
};

// 是否 选择 只看高铁动车
export function setHighSpeed(highspeed) {
  return {
    type: ACTION_SET_HIGH_SPEED,
    palaod: highspeed,
  };
};

// 是否选择高铁动车 切换
export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highspeed } = getState();
    dispatch(setHighSpeed(!highspeed));
  }
};

// 列车时刻表 list
export function setTrainList(trainList) {
  return {
    type: ACTION_SET_TRAIN_LIST,
    palaod: trainList,
  };
};

// 切换 底部 tab 第一个，出发类型:（早到完: ORDER_DEPART，耗时短到长: ORDER_DUATION）
export function toggleOrderType() {
  return (dispatch, getState) => {
    const { orderType } = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        palaod: ORDER_DUATION,
      });
    } else {
       dispatch({
        type: ACTION_SET_ORDER_TYPE,
        palaod: ORDER_DEPART,
      });
    }
  };
};

// 只看有票
export function toggleOnlyTickets() {
  return (dispatch, getState) => {
    const { onlyTickets } = getState();
    dispatch({
      type: ACTION_SET_ONLY_TICKETS,
      palaod: !onlyTickets,
    });
  }
};

// 票 类型
export function setTicketTypes(ticketTypes) {
  return {
    type: ACTION_SET_TICKETS_TYPE,
    palaod: ticketTypes,
  };
};

// 存储 选择的票类型 的值
export function setCheckedTicketsTypes(checkedTicketsTypes) {
  return {
    type: ACTION_SET_CHECKED_TICKETS_TYPE,
    palaod: checkedTicketsTypes,
  };
};

// 车次类型
export function setTrainTypes(trainTypes) {
  return {
    type: ACTION_SET_TRAIN_TYPE,
    palaod: trainTypes,
  };
};

// 存储 车次类型
export function setCheckedTrainTypes(checkedTrainTypes) {
  return {
    type: ACTION_SET_CHECKED_TRAIN_TYPE,
    palaod: checkedTrainTypes,
  };
};

// 起点站
export function setDepartStations(departStations) {
  return {
    type: ACTION_SET_DEPART_STATIONS,
    palaod: departStations,
  };
};

// 存储 起点站
export function setCheckedDepartStations(checkedDepartStations) {
  return {
    type: ACTION_SET_CHECKED_DEPART_STATIONS,
    palaod: checkedDepartStations,
  };
};

// 终点站
export function setArriveStations(arriveStations) {
  return {
    type: ACTION_SET_ARRIVE_STATIONS,
    palaod: arriveStations,
  };
};

// 存储 终点站
export function setCheckedArriveStations(checkedArriveStations) {
  return {
    type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
    palaod: checkedArriveStations,
  };
};

// 起始时间
export function setDepartTimeStart(departTimeStart) {
  return {
    type: ACTION_SET_DEPART_TIME_START,
    palaod: departTimeStart,
  };
};

// 
export function setDepartTimeEnd(departTimeEnd) {
  return {
    type: ACTION_SET_DEPART_TIME_END,
    palaod: departTimeEnd,
  };
};
export function setArriveTimeStart(arriveTimeStart) {
  return {
    type: ACTION_SET_ARRIVE_TIME_START,
    palaod: arriveTimeStart
  };
};
export function setArriveTimeEnd(arriveTimeEnd) {
  return {
    type: ACTION_SET_ARRIVE_TIME_END,
    palaod: arriveTimeEnd,
  };
};

// 弹窗显示隐藏
export function setIsFiltersVisile() {
  return (dispatch, getState) => {
    const { isFiltersVisile } = getState();
    dispatch({
      type: ACTION_SET_IS_FILTERS_VISIBLE,
      palaod: !isFiltersVisile,
    });
  }
};

// 地址栏的值 处理完之后再调接口
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    palaod: searchParsed,
  };
};

// 后一天
export function nextDate() {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(dateTransform(departDate) + 86400 * 1000));
  }
}

// 前一天
export function prevDate() {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(dateTransform(departDate) - 86400 * 1000));
  }
}