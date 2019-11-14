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

export const showCitySelector = (currentSelectingLeftCity) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_IS_CITY_SELECTOR_VISIBLE,
      payload: true,
    });

    dispatch({
      type: ACTION_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity,
    });
  }
}

export const hideCitySelector = () => {
  return {
    type: ACTION_IS_CITY_SELECTOR_VISIBLE,
    payload: false,
  }
}

export const setSelectedCity = (city) => {
  console.log('city:', city);
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();
    console.log('currentSelectingLeftCity:', currentSelectingLeftCity);

    if (currentSelectingLeftCity) {
      dispatch(setForm(city));
    } else {
      dispatch(setTo(city))
    }

    dispatch(hideCitySelector());
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
    dispatch(setForm(to));
    dispatch(setTo(from));
  }
}

// 请求 城市 列表数据
export function fetchCityData () {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState();
    console.log('isLoadingCityData:', isLoadingCityData);
    if (isLoadingCityData) { // 如果正在请求 城市数据， 不再次请求接口
      return;
    }

    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');

    if(Date.now() < cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }

    dispatch(setIsLoadingCityData(true));
    fetch('/rest/cities?_='+ Date.now())
      .then(res => res.json())
      .then((cityData) => {
        console.log('fetch --- cityData:', cityData);
        dispatch(setCityData(cityData));
        dispatch(setIsLoadingCityData(false));
        localStorage.setItem('city_data_cache', JSON.stringify({
          expires: Date.now() + 60 * 1000, // 设置过期时间
          data: cityData,
        }));
      })
      .catch(() => {
        dispatch(setIsLoadingCityData(false));
      });
  }
}