import React from 'react';
import Protypes from 'prop-types';
import './cityItem.scss';


const alphaData = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

// console.log('alphaData:', alphaData);

function CityItem(props) {
  const { onScrollToTarget } = props;

  return (
    <div className="citt-item">
      {
        alphaData && alphaData.map((item, index) => {
          return (
            <i
              key={index.toString()}
              className="city-item-title"
              onClick={() => onScrollToTarget(item)}
            >
              {item}
            </i>
          );
        })
      }
    </div>
  );
}

CityItem.prototype = {
  onScrollToTarget: Protypes.func.isRequired,
};

export default CityItem;
