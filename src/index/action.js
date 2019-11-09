export const ACTION_SET_FORM = 'ACTION_SET_FORM'; // 起点站
export const ACTION_TO = '上海'; // 终点站

// 城市 弹窗 打开 关闭 状态
export const ACTION_IS_CITY_SELECTOR_VISIBLE = 'ACTION_IS_CITY_SELECTOR_VISIBLE';

// 起点站 是否 有值
export const ACTION_CURRENT_SELECTING_LEFT_CITY = 'ACTION_CURRENT_SELECTING_LEFT_CITY';

// 城市数据
export const ACTION_CITY_DATA = 'ACTION_CITY_DATA';

// 是否正在 加载 城市列表
export const ACTION_IS_LOADING_CITY_DATA = 'ACTION_IS_LOADING_CITY_DATA';

// 日期选择 弹窗 是否打开
export const ACTION_IS_DATE_SELECTOR_VISIBLE = 'ACTION_IS_DATE_SELECTOR_VISIBLE';

// 是否选择了 只看高铁动车
export const ACTION_HIGH_SPEED = 'ACTION_HIGH_SPEED';

// 日期选择
export const ACTION_DEPART_DATE = 'ACTION_DEPART_DATE';



export const setDepartDate = (date) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_DEPART_DATE,
      payload: date,
    })
  }
}

export const setForm = (form) => {
  return {
    type: ACTION_SET_FORM,
    payload: form,
  }
}

export const setTo = (to) => {
  return {
    type: ACTION_TO,
    payload: to,
  }
}

export const setIsLoadingCityData = (isLoadingCityData) => {
  return {
    type: ACTION_IS_CITY_SELECTOR_VISIBLE,
    payload: isLoadingCityData,
  }
}

export const setCityData = (cityData) => {
  return {
    type: ACTION_CITY_DATA,
    payload: cityData,
  }
}

export const toggleHighSpeed = () => {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: ACTION_HIGH_SPEED,
      payload: !highSpeed,
    });
  }
}

export const showCityelector = (currentSelectingLeftCity) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_IS_DATE_SELECTOR_VISIBLE,
      payload: true,
    });

    dispatch({
      type: ACTION_CURRENT_SELECTING_LEFT_CITY,
      paylaod: currentSelectingLeftCity,
    })
  }
}

export const hideCitySelector = () => {
  return {
    type: ACTION_IS_DATE_SELECTOR_VISIBLE,
    payload: false,
  }
}

export const setSelectedCity = (city) => {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();
    if (currentSelectingLeftCity) {
      dispatch(setForm(city));
    } else {
      dispatch(setTo(city))
    }
  }
}

export const showDateSelector = () => {
  return {
    type: ACTION_IS_DATE_SELECTOR_VISIBLE,
    payload: true,
  }
}

export const hideDateSelector = () => {
  return {
    type: ACTION_IS_DATE_SELECTOR_VISIBLE,
    payload: false,
  }
}

export const exchangeFromTo = () => {
  return (dispatch, getState) => {
    const { from, to } = getState();
    console.log('to:', to);
    console.log('from:', from);
    dispatch(setForm(to));
    dispatch(setTo(from));
  }
}