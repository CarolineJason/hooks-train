import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import CityItem from '../cityItem/cityItem';
import Suggest from '../suggest';

import './cityList.scss';

// 城市 浮层 列表
const CityList = memo(function CityList(props) {
  const { cityData, onCitySelect, searchKey } = props;
  // console.log('CityList----:props:', props);

  const onScrollToTarget = useCallback((target) => {
    const ele = document.querySelector(`div[name=data-${target}]`);
    ele.scrollIntoView();
  }, []);

  return (
    <div className="city-list">
      <div className="city-rate">
        {
          cityData && cityData.cityList && cityData.cityList.map((item, index) => {
            return (
              <div className="wrap" key={index.toString()}>
                <div className="city-title" name={`data-${item.title}`}>{item.title}</div>
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
      <div className="city-list-item">
        <CityItem onScrollToTarget={onScrollToTarget} />
      </div>
      {
        Boolean(searchKey) ? (
          <Suggest onCitySelect={onCitySelect} searchKey={searchKey} />
        ) : ''
      }
    </div>
  )
});

CityList.propTypes = {
  cityData: PropTypes.object,
  onCitySelect: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
};

export default CityList;
