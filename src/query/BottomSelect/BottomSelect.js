import React, { memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import BottomModal from './BottomModal';

import './BottomSelect.scss';
import { ORDER_DEPART } from '../constant';

function Bottom(props) {
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
        <i className={classnames('icon iconfont icon-slef')}>&#xe65f;</i>
        {
          orderType === ORDER_DEPART ? 
            (<span className="icon-text">出发 早 ➡ 晚</span>) 
            : 
            <span className="icon-text">时间 短 ➡ 长</span>
        }
        </span>
        <span
          className="item"
          onClick={toggleHighSpeed}
        >
        <i className={classnames('icon iconfont icon-slef', { 'item-on' : highSpeed })}>&#xe65a;</i>
          <span className="icon-text">只看高铁动车</span>
        </span>
        <span
          className="item"
          onClick={toggleOnlyTickets}
        >
        <i className={classnames('icon iconfont icon-slef', { 'item-on' : onlyTickets })}>
          &#xe89d;
        </i>
          <span className="icon-text">只看有票</span>
        </span>
        <span
          className="item"
          onClick={toggleIsFiltersVisible}
        >
        <i className={classnames('icon iconfont icon-slef', { 'item-on' : isFiltersVisible })}>
          &#xe612;
        </i>
          <span className="icon-text">综合筛选</span>
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