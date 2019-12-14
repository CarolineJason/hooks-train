import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
    setIsFiltersVisile,
  } = props;
  console.log('props:', props);
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
          &#xe65a;
        </i>
          只看有票
        </span>
        <span
          className="item"
          onClick={setIsFiltersVisile}
        >
        <i className={classnames('icon iconfont', { 'item-on' : isFiltersVisible })}>
          &#xe612;
        </i>
          只看有票
        </span>
      </div>
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
};

export default Bottom;