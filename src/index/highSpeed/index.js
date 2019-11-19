import React from 'react';
import classnames from 'classnames';
import './index.scss';

function HighSpeed(props){
  const { HighSpeed, toggle } = props;
  console.log('HighSpeed---props:', props);
  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={() => toggle()}>
        <input type="hidden" name="high-speed" value={HighSpeed} />
        <div
          className={classnames('high-speed-track', {
            checked: HighSpeed
          })}
        >
          <span
            className={classnames('high-speed-handle', {
              checked: HighSpeed
            })}
          >
          </span>
        </div>
      </div>
    </div>
  )
}

export default HighSpeed;
