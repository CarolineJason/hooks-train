import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
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

  console.log(111);
  console.log(props);
  // 用 useState() 函数 保存 用户的筛选结果
  const [localTicketTypes, setLocalTicketTypes] = useState(ticketTypes);

  const [localTrainTypes, setLocalTrainTypes] = useState(trainTypes);

  const [localDepStations, setLocalDepStations] = useState(depStations);

  const [localArrStations, setLocalArrStations] = useState(arrStations)

  debugger

  const groupOptions = [
    {
      title: '座席类型',
      options: localTicketTypes,
      checkedMap: checkedTicketsTypes,
      update: setLocalTicketTypes,
    },
    {
      title: '车次类型',
      options: localTrainTypes,
      checkedMap: checkedTrainTypes,
      update: setLocalTrainTypes,
    },
    {
      title: '出发车站',
      options: localDepStations,
      checkedMap: checkedDepartStations,
      update: setLocalDepStations,
    },
    {
      title: '到达车站',
      options: localArrStations,
      checkedMap: checkedArriveStations,
      update: setLocalArrStations,
    },
  ];

  console.log('groupOptions:', groupOptions);
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
