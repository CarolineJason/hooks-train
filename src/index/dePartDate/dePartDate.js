import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { dateTransform } from '../../common/fp';

import './index.scss';

function DeDatePart(props){
  const {
    time,
    onTimeSelect,
  } = props;
  // const dateTime = dateTransform();

  const transTimeString = useMemo(() => {
    return dayjs(time).format('YYYY-MM-DD')
  }, [time]);

  const nowDay = new Date(dateTransform()).getDay();
  const isToday = dateTransform(time) === dateTransform();

  const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][nowDay] + (isToday ? '(今天)' : '');

  return (
    <div className="depart-date" onClick={onTimeSelect}>
      <input type="hidden" name="date" value={transTimeString} />
      {transTimeString}&nbsp;
      <span className="depart-week">{weekString}</span>
    </div>
  )
}

DeDatePart.propTypes = {
  time: PropTypes.number.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
};



export default DeDatePart;
