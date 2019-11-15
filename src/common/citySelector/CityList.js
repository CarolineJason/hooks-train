import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './cityList.scss';


// 城市 浮层 列表
const CityList = memo(function CityList(props) {
  const { cityData, onCitySelect } = props;
  console.log('cityData----:props:', props);
  return (
    <div className="city-list">
      <div className="city-rate">
        {
          cityData && cityData.cityList && cityData.cityList.map((item, index) => {
            return (
              <div className="wrap" key={index.toString()}>
                <div className="city-title">{item.title}</div>
                {
                  item.citys && item.citys.map((city, i) => {
                    return (
                      <div
                        className="city-name"
                        key={i.toString()}
                        onClick={() => onCitySelect(city.name)}
                      >
                        {city.name}
                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    </div>
  )
});

CityList.propTypes = {
  cityData: PropTypes.object,
  onCitySelect: PropTypes.func.isRequired,
};

export default CityList;
