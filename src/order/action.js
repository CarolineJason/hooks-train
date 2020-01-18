export const ACTION_SET_TRAIN_NUMBER = 'ACTION_SET_TRAIN_NUMBER';
export const ACTION_SET_DEPART_STATION = 'ACTION_SET_DEPART_STATION';
export const ACTION_SET_ARRIVE_STATION = 'ACTION_SET_ARRIVE_STATION';
export const ACTION_SET_DATE = 'ACTION_SET_DATE';
export const ACTION_SET_SEAT_TYPE = 'ACTION_SET_SEAT_TYPE';
export const ACTION_SET_ARRIVE_DATE = 'ACTION_SET_ARRIVE_DATE';
export const ACTION_SET_DEPART_TIME_STR = 'ACTION_SET_DEPART_TIME_STR';
export const ACTION_SET_ARRIVE_TIME_STR = 'ACTION_SET_ARRIVE_TIME_STR';
export const ACTION_SET_DURATION_STR = 'ACTION_SET_DURATION_STR';
export const ACTION_SET_PRICE = 'ACTION_SET_PRICE';
export const ACTION_SET_PASSENGERS = 'ACTION_SET_PASSENGERS';
export const ACTION_SET_MENU = 'ACTION_SET_MENU';
export const ACTION_SET_IS_MENU_VISIBLE = 'ACTION_SET_IS_MENU_VISIBLE';
export const ACTION_SET_SEARCH_PARSED = 'ACTION_SET_SEARCH_PARSED';


export function setTrainNumber(trainNumber) {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber,
  }
}
export function setDepartStation(departStation) {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: departStation,
  }
}
export function setArriveStation(arriveStation) {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: arriveStation,
  }
}
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DATE,
    payload: departDate,
  }
}
export function setSeatType(seatType) {
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload: seatType,
  }
}
export function setArriveDate(arriveDate) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate,
  }
}
export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr,
  }
}
export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr,
  }
}
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr,
  }
}
export function setPrice(price) {
  return {
    type: ACTION_SET_PRICE,
    payload: price,
  }
}
export function setPassengers(passengers) {
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers,
  }
}
export function setMenu(menu) {
  return {
    type: ACTION_SET_MENU,
    payload: menu,
  }
}
export function setIsMenuVisible(isMenuVisible) {
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload: isMenuVisible,
  }
}
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  }
}

export function fetchInital(url) {
  return (dispatch, getState) => {
    fetch(url).then((res) => res.json())
      .then((data) => {
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price,
        } = data;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveTimeStr(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      })
      .catch((err) => {
        console.log('err:', err);
      })
  }
}

let passengerIdSeed = 0;

export function createAdult () {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for(let passenger of passengers) {
      console.log('passengers:11111', passengers);
      console.log('passenger:22222', passenger);

      const keys = Object.keys(passenger);
      // console.log('keys:', keys);
      for (let key of keys) {
        if (!passenger[key]) {
          alert('添加 成人1 的每条信息 都不为空');
          return;
        }
      }
    }

    dispatch(setPassengers([
      ...passengers,
      {
        id: passengerIdSeed += 1,
        name: '',
        ticketType: 'adult',
        liscenceNo: '',
        seat: 'Z',
      }
    ]));
  }
}

export function createChild () {
  return (dispatch, getState) => {
    const { passengers } = getState();
    let adultFound = null;

    for(let passenger of passengers) {
      const keys = Object.keys(passenger);
      console.log('keys:', keys);
      for (let key of keys) {
        if (!passenger[key]) {
          console.log('passenger[key]:', passenger[key]);
          alert('添加 成人2 的每条信息 都不为空');
          return;
        }
      }

      if(passenger.ticketType = 'adult') {
        adultFound = passenger.id;
      }
    }

    if (!adultFound) {
      alert('请至少添加一个成人!');
      return false;
    }

    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passengerIdSeed,
        name: "",
        gender: "none",
        birthday: "",
        followAdult: adultFound,
        ticketType: "child",
        seat: "Z",
      }
    ]));
  }
}

export function removePassenger(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newPassengers = passengers.filter((passenger) => {
      return passenger.id !== id && passenger.followAdult !== id;
    });
    dispatch(setPassengers(newPassengers));
  }
}

//成人 儿童 用户 信息  action
export function updatePassenger(id, data) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let i = 0; i< passengers.length; i++) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({},passengers[i], data);
        dispatch(setPassengers(newPassengers));
        break;
      }
    }
  }
}

export function showMenu(menu) {
  return (dispatch) => {
    dispatch(setMenu(menu));
    dispatch(setIsMenuVisible(true));
  }
}

export function showGenderMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    
    const passenger = passengers.find((passenger) => passenger.id === id);
    if (!passenger) {
      return;
    }

    dispatch(showMenu({
      onPress(gender) {
        dispatch(updatePassenger(id, { gender }));
        dispatch(hideMenu(false));
      },
      options: [
        {
          title: '男',
          value: 'male',
          active: 'male' === passenger.gender,
        },
        {
          title: '女',
          value: 'female',
          active: 'female' === passenger.gender,
        }
      ]
    }))
  }
}

export function hideMenu() {
  return setIsMenuVisible(false)
}