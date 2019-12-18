import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TimeSlider from './TimeSlider';
import Options from './Options';

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

  // 用 useState() 函数 保存 用户的筛选结果
  const [localCheckedTicketsTypes, setLocalCheckedTicketsTypes] = useState(checkedTicketsTypes);

  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(checkedTrainTypes);

  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(checkedDepartStations);

  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(checkedArriveStations)


  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);
  
  const groupOptions = [
    {
      title: '座席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketsTypes,
      update: setLocalCheckedTicketsTypes,
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes,
    },
    {
      title: '出发车站',
      options: depStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations,
    },
    {
      title: '到达车站',
      options: arrStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations,
    },
  ];


  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className="reset">重制</span>
            <span className="ok" onClick={toggleIsFiltersVisible}>确定</span>
          </div>
          <div className="optionis">
            {
              groupOptions && groupOptions.map((group) => {
                return (
                  <Options {...group} key={group.title} />
                )
              })
            }
            <TimeSlider 
              title="出发时间"
              currentStartHours={localDepartTimeStart}
              currentEndHours={localDepartTimeEnd}
              onStartChanged={setLocalDepartTimeStart}
              onEndChanged={setLocalDepartTimeEnd}
            />
            <TimeSlider 
              title="到达时间"
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
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

export default BottomModal;
