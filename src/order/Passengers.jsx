import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Passengers.scss';

const PassengerItem = memo(function PassengerItem(props){
  const {
    id,
    name,
    followAdult,
    ticketType,
    liscenceNo,
    gender,
    birthday,
    removePassenger,
    onUpdate,
    showGenderMenu,
  } = props;

  const isAdult = ticketType === 'adult';

  return (
    <li className="passenger">
      <i className="delete" onClick={() => removePassenger(id)}>—</i>
      <ol className="items">
        <li className="item">
          <label className="label name">姓名</label> 
          <input
            type="text"
            className="input name"
            placeholder="乘客姓名"
            value={name}
            onChange={(e) => onUpdate(id, {name: e.target.value})}
          />
          <label className="ticket-type">
            {
              ticketType === 'adult' ? '成人票' : '儿童票'
            }
          </label>
        </li>
        {
          isAdult && 
          <li className="item">
            <label className="label liscenceNo">身份证</label>
            <input
              type="text"
              className="input liscenceNo"
              placeholder="证件号码"
              value={liscenceNo}
              onChange={(e) => onUpdate(id, { liscenceNo: e.target.value })}
            />
          </li>
        }
        {
          !isAdult &&
          <li className="item arrow">
            <label className="label gender">性别</label>
            <input
              type="text"
              readOnly
              className="input gender"
              placeholder="请选择"
              value={
                gender === 'male' ? '男' : ( gender === 'female' ? '女' : '')
              }
              onClick={() => showGenderMenu(id)}
            />
          </li>
        }
        {
          !isAdult &&
          <li className="item">
            <label className="label birthday">出生日期</label>
            <input
              type="text"
              className="input birthday"
              placeholder="如1996-10-15"
              value={birthday}
              onChange={(e) => onUpdate(id, { liscenceNo: e.target.value })}
            />
          </li>
        }
        {
          !isAdult &&
          <li className="item arrow">
            <label className="label followAdult">同行成人</label>
            <input
              type="text"
              className="input followAdult"
              placeholder="请选择"
              value={followAdult}
              readOnly
            />
          </li>
        }
        
      </ol>
    </li>
  );
});

PassengerItem.prototype = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  followAdult: PropTypes.string,
  ticketType: PropTypes.string.isRequired,
  liscenceNo: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  removePassenger: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
};


const Passengers = memo((props) => {
  const {
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
    showGenderMenu,
  } = props;
  return (
    <div className="passengers">
      <ul>
        {
          passengers.map((passenger) => {
            return <PassengerItem
              {...passenger}
              key={passenger.id}
              removePassenger={removePassenger}
              onUpdate={updatePassenger}
              showGenderMenu={showGenderMenu}
            />
          })
        }
      </ul>
      <section className="add">
        <div className="adult" onClick={() => createAdult()}>添加成人</div>
        <div className="child" onClick={() => createChild()}>添加儿童</div>
      </section>
    </div>
  )
})

Passengers.prototype = {
  passengers: PropTypes.array.isRequired,
  createAdult: PropTypes.func.isRequired,
  createChild: PropTypes.func.isRequired,
  removePassenger: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
};

export default Passengers;
