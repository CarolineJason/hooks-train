import classnames from "classnames";
import leftPad from "left-pad";
import URI from 'urijs';
import dayjs from 'dayjs';
import PropTypes from "prop-types";
import React, { memo, useState, useEffect } from "react";
import "./Schdelu.scss";

const ScheduleRow = memo(function ScheduleRow(props) {
  const {
    index,
    station,
    arriveTime,
    departTime,
    stay, // 停留时长

    isStartStation,
    isEndStation,
    isDeaprtStation,
    isArriveStation,
    beforeDepartStation,
    afterArriveStation,
  } = props;

  return (
    <li>
      <div
        className={classnames("icon", {
          "icon-red": isDeaprtStation || isArriveStation,
        })}
      >
        {isDeaprtStation ? "出" : isArriveStation ? "到" : leftPad(index, 2, 0)}
      </div>
      <div
        className={classnames("row", {
          grey: beforeDepartStation || afterArriveStation,
        })}
      >
        <span
          className={classnames("station", {
            red: isArriveStation || isDeaprtStation,
          })}
        >
          {station}
        </span>
        <span
          className={classnames("arrtime", {
            red: isArriveStation,
          })}
        >
          {isStartStation ? "始发站" : arriveTime}
        </span>
        <span
          className={classnames("deptime", {
            red: isDeaprtStation,
          })}
        >
          {isEndStation ? "终到站" : departTime}
        </span>
        <span className="spottime">
          {isStartStation || isEndStation ? "-" : stay + "分"}
        </span>
      </div>
    </li>
  );
}, []);

export default function Schdelu(props) {
  const { date, trainNumber, arriveStation, departStation } = props;

  const [scheduleList, setSchdeluList] = useState([]);
  useEffect(() => {
      const url = new URI("/rest/schedule")
        .setSearch("trainNumber", trainNumber)
        .setSearch("arriveStation", arriveStation)
        .setSearch("departStation", departStation)
        .setSearch("date", dayjs(date).format("YYYY-MM-DD"))
        .toString();

      fetch(url)
        .then(res => res.json())
        .then(data => {
          let departRow; // 出发车站
          let arriveRow; // 到达车站

          for (let i = 0; i < data.length; ++i) {
            if (!departRow) {
              if (data[i].station === departStation) {
                departRow = Object.assign(data[i], {
                  beforeDepartStation: false,
                  isDepartStation: true,
                  afterArriveStation: false,
                  isArriveStation: false,
                });
              } else {
                Object.assign(data[i], {
                  beforeDepartStation: true,
                  isDepartStation: false,
                  afterArriveStation: false,
                  isArriveStation: false,
                });
              }
            } else if (!arriveRow) {
              if (data[i].station === arriveStation) {
                arriveRow = Object.assign(data[i], {
                  beforeDepartStation: false,
                  isDepartStation: false,
                  afterArriveStation: false,
                  isArriveStation: true,
                });
              } else {
                Object.assign(data[i], {
                  beforeDepartStation: false,
                  isDepartStation: false,
                  afterArriveStation: false,
                  isArriveStation: false,
                });
              }
            } else {
              Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: true,
                isArriveStation: false,
              });
            }

            Object.assign(data[i], {
              isStartStation: i === 0,
              isEndStation: i === data.length - 1,
            });
          }
          console.log('data:', data);
          setSchdeluList(data);
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    [date, trainNumber, arriveStation, departStation]
  );

  return (
    <div className="schedule">
      <div className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="deptime">到达</span>
          <span className="arrtime">发车</span>
          <span className="stoptime">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => {
            return (
              <ScheduleRow
                key={schedule.station}
                index={index + 1}
                {...schedule}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

Schdelu.propTypes = {
  date: PropTypes.number.isRequired,
  trainNumber: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
};
