import React from 'react';
import switchImg from '../imgs/switch.svg';


import './index.scss';


function Journey(props) {
  const {
    from,
    to,
    showCityelector,
    exchangeFromTo,
  } = props;
  console.log('Journey:', props);

  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCityelector(true)}>
        <input
          readOnly
          type="text"
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={exchangeFromTo}>
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div className="journey-station" onClick={() => showCityelector(false)}>
        <input
          readOnly
          type="text"
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  )
}


export default Journey;
