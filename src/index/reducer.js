import {
  ACTION_SET_FORM,
  ACTION_TO,
  ACTION_IS_CITY_SELECTOR_VISIBLE,
  ACTION_CURRENT_SELECTING_LEFT_CITY,
  ACTION_CITY_DATA,
  ACTION_IS_LOADING_CITY_DATA,
  ACTION_IS_DATE_SELECTOR_VISIBLE,
  ACTION_HIGH_SPEED,
  ACTION_DEPART_DATE
} from './action';


export default {
  from(state = "上海", action){ // 起点站
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_FORM:
        return payload;
      default:
    }
    return state;
  },
  to(state = "北京", action){ // 终点站
    const { type, payload } = action;
    switch(type) {
      case ACTION_TO:
        return payload;
      default:
    }
    return state;
  },
  departDate(state, action){ // 选择日期
    const { type, payload } = action;
    switch (type) {
      case ACTION_DEPART_DATE:
        return payload;
      default:
    }
    return state;
  },
  isCitySelectorVisible(state  =  false, action){ // 城市选择浮层是否 打开
    const { type, payload } = action;
    switch(type) {
      case ACTION_IS_CITY_SELECTOR_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  currentSelectingLeftCity(state = false, action) {// 起点站 是否选择
    const { type, payload } = action;
    switch (type) {
      case ACTION_CURRENT_SELECTING_LEFT_CITY:
        return payload;
      default:
    }
    return state;
  },
  cityData(state = null, action) { // 城市数据
    const { type, payload } = action;
    switch(type) {
      case ACTION_CITY_DATA:
        return payload;
      default:
    }
    return state;
  },
  isLoadingCityData(state = false, action) {// 是否正在加载 城市数据
    const { type, payload } = action;
    switch(type) {
      case ACTION_IS_LOADING_CITY_DATA:
        return payload;
      default:
    }
    return state;
  },
  isDateSelectorVisible(state = false, action) {// 日期 选择浮层是否 打开
    const { type, payload } = action;
    switch(type) {
      case ACTION_IS_DATE_SELECTOR_VISIBLE:
        return payload;
      default:
    }
    return state;
  },
  isHighSpeed(state = false, action) { // 是否选择 只看 高铁 动车
    const { type, payload } = action;
    switch(type) {
      case ACTION_HIGH_SPEED:
        return payload;
      default:
    }
    return state;
  },
}