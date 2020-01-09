import React, { memo, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TimeSlider from './TimeSlider';
import Options from './Options';

const BottomModal = memo(function BottomModal(props) {
  const {
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
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
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations,
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations,
    },
  ];

  // 确定  更新 store 中的数据 
  const sure = () => {
    setCheckedTicketsTypes(localCheckedTicketsTypes);
    setCheckedTrainTypes(localCheckedTrainTypes);
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStations(localCheckedArriveStations);

    setDepartTimeStart(localDepartTimeStart);
    setDepartTimeEnd(localDepartTimeEnd);
    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);

    toggleIsFiltersVisible();
  }

  const isResetDisabled = useMemo(() => {
    return Object.keys(localCheckedTicketsTypes).length === 0
    && Object.keys(localCheckedTrainTypes).length === 0
    && Object.keys(localCheckedDepartStations).length === 0
    && Object.keys(localCheckedArriveStations).length === 0
    && localDepartTimeStart === 0
    && localDepartTimeEnd === 24
    && localArriveTimeStart === 0
    && localArriveTimeEnd === 24
  }, [
    localCheckedTicketsTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStations,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd
  ]);
    

  // 重置
  const reset = () => {
    if (isResetDisabled) {
      return;
    }

    setLocalCheckedTicketsTypes({});
    setLocalCheckedTrainTypes({});
    setLocalCheckedDepartStations({});
    setLocalCheckedArriveStations({});

    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  }

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className={classnames('reset', {
              disabled: isResetDisabled,
            })} onClick={reset}>重置</span>
            <span className="ok" onClick={sure}>确定</span>
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
