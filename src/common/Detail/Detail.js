import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import './Detail.scss';

function fromat(d) {
  const date = dayjs(d);
  return date.format('MM-DD') + ' ' + date.locale('zh-cn').format('ddd');
}

export default function Detail(props) {
  const {
    departDate,
    arriveDate,
    departStation,
    arriveStation,
    departTimeStr,
    arriveTimeStr,
    trainNumber,
    durationStr,
    toggleIsScheduleVisible,
  } = props;

  const departDateString = useMemo(() => {
    return fromat(departDate);
  }, [departDate]);

  const arriveDateString = useMemo(() => {
    return fromat(arriveDate);
  }, [arriveDate]);

  return (
    <div className="detail">
      <div className="content">
        <div className="left">
          <div className="city">{departStation}</div>
          <div className="time">{departTimeStr}</div>
          <div className="date">{departDateString}</div>
        </div>
        <div className="middle">
          <div className="train-name">{trainNumber}</div>
          <div className="train-mid">
            <span className="left"></span>
            <span className="schedule" onClick={() => toggleIsScheduleVisible()}>时刻表</span>
            <span className="right"></span>
          </div>
          <div className="train-time">耗时{durationStr}</div>
        </div>
        <div className="right">
          <div className="city">{arriveStation}</div>
          <div className="time">{arriveTimeStr}</div>
          <div className="date">{arriveDateString}</div>
        </div>
      </div>
    </div>
  )
}

Detail.propTypes = {
  departDate: PropTypes.number.isRequired,
  arriveDate: PropTypes.number.isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
  departTimeStr: PropTypes.string,
  arriveTimeStr: PropTypes.string,
  trainNumber: PropTypes.string.isRequired,
  durationStr: PropTypes.string,
  toggleIsScheduleVisible: PropTypes.func.isRequired,
};

