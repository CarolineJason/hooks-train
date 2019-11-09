import React from 'react';
import switchImg from '../imgs/switch.svg';

import './index.css';


function Journey(props) {
  const {
    from,
    to
  } = props;
  console.log('props:', props);

  return (
    <div className="journey">
      <div className="journey-station">
        <input
          type="text"
          name="from"
          readOnly
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch">
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div className="journey-station">
        <input
          type="text"
          name="to"
          readOnly
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  )
}


export default Journey;
