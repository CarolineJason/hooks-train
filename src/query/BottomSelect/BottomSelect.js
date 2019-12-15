import React, { memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './BottomSelect.scss';
import { ORDER_DEPART } from '../constant';

const Filter = memo(function(props) {
  const { name, checked } = props;
  return (
    <div className={classnames({ 'checked': checked })}>{name}</div>
  )
});

Filter.prototype = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

const Options = memo(function Options(props){
  const {
    title,
    options,
    checkedmap,
  } = props;
  return (
    <div className="options">
      <h3>{title}</h3>
      <ul>
        {
          options && options.map((option) => {
            return (
              <Filter
                {...option}
                key={option.value}
                checked={option.value in checkedmap}
              />
            )
          })
        }
      </ul>
    </div>
  )
});


Options.prototype = {
  title: PropTypes.string.isRequired,
  checkedmap: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

const BottomModal = memo(function BottomModal(props) {
  const {
    ticketTypes,
    trainTypes,
    depStations,
    arrStations,
    checkedTicketsTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketsTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible,
  } = props;

  const groupOptions = [
    {
      title: '座席类型',
      options: ticketTypes,
      checkedMap: checkedTicketsTypes,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: checkedTrainTypes,
    },
    {
      title: '出发车站',
      options: depStations,
      checkedMap: checkedDepartStations,
    },
    {
      title: '到达车站',
      options: arrStations,
      checkedMap: checkedArriveStations,
    },
  ];

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className="reset">重制</span>
            <span className="ok">确定</span>
          </div>
          <div className="optionis">
            {
              groupOptions && groupOptions.map((group) => {
                return (
                  <Options {...group} key={group.title} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
});

BottomModal.prototype = {
    ticketTypes: PropTypes.array.isRequired, // 第四个tab 的属性
    trainTypes: PropTypes.array.isRequired,
    depStations: PropTypes.array.isRequired,
    arrStations: PropTypes.array.isRequired,
    checkedTicketsTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    setCheckedTicketsTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
};

function Bottom(props) {
  console.log(123123);
  console.log(props);
  const {
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,

    ticketTypes,
    trainTypes,
    depStations,
    arrStations,
    checkedTicketsTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketsTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
  } = props;

  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span
          className="item"
          onClick={toggleOrderType}
        >
        <i className={classnames('icon iconfont')}>&#xe65f;</i>
        {
          orderType === ORDER_DEPART ? '出发 早 ➡ 晚' : '时间 短 ➡ 长'
        }
        </span>
        <span
          className="item"
          onClick={toggleHighSpeed}
        >
        <i className={classnames('icon iconfont', { 'item-on' : highSpeed })}>&#xe65a;</i>
          只看高铁动车
        </span>
        <span
          className="item"
          onClick={toggleOnlyTickets}
        >
        <i className={classnames('icon iconfont', { 'item-on' : onlyTickets })}>
          &#xe89d;
        </i>
          只看有票
        </span>
        <span
          className="item"
          onClick={toggleIsFiltersVisible}
        >
        <i className={classnames('icon iconfont', { 'item-on' : isFiltersVisible })}>
          &#xe612;
        </i>
          综合筛选
        </span>
      </div>
      {
        isFiltersVisible ? (
          <BottomModal
            ticketTypes={ticketTypes}
            trainTypes={trainTypes}
            depStations={depStations}
            arrStations={arrStations}
            checkedTicketsTypes={checkedTicketsTypes}
            checkedTrainTypes={checkedTrainTypes}
            checkedDepartStations={checkedDepartStations}
            checkedArriveStations={checkedArriveStations}
            departTimeStart={departTimeStart}
            departTimeEnd={departTimeEnd}
            arriveTimeStart={arriveTimeStart}
            arriveTimeEnd={arriveTimeEnd}
            setCheckedTicketsTypes={setCheckedTicketsTypes}
            setCheckedTrainTypes={setCheckedTrainTypes}
            setCheckedDepartStations={setCheckedDepartStations}
            setCheckedArriveStations={setCheckedArriveStations}
            setDepartTimeStart={setDepartTimeStart}
            setDepartTimeEnd={setDepartTimeEnd}
            setArriveTimeStart={setArriveTimeStart}
            setArriveTimeEnd={setArriveTimeEnd}
            toggleIsFiltersVisible={toggleIsFiltersVisible}
          />
        ) :''
      }
    </div>
  );
}

Bottom.prototype = {
    highSpeed: PropTypes.bool.isRequired,
    orderType: PropTypes.number.isRequired,
    onlyTickets: PropTypes.bool.isRequired,
    isFiltersVisible: PropTypes.bool.isRequired,
    toggleOrderType: PropTypes.func.isRequired,
    toggleHighSpeed: PropTypes.func.isRequired,
    toggleOnlyTicke: PropTypes.func.isRequired,
    setIsFiltersVis: PropTypes.func.isRequired,

    ticketTypes: PropTypes.array.isRequired, // 第四个tab 的属性
    trainTypes: PropTypes.array.isRequired,
    depStations: PropTypes.array.isRequired,
    arrStations: PropTypes.array.isRequired,
    checkedTicketsTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    setCheckedTicketsTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
};

export default Bottom;