import React, { useState, useMemo, useEffect, memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CityList from './cityList/CityList';

import './citySelector.scss';

// 城市 浮层 组件
const CitySelector = memo(function CitySelector (props) {
  const {
    show,
    isLoading,
    cityData,
    onBack,
    fetchCityData,
    onCitySelect,
  } = props;

  const [searchKey, setSearchKey] = useState('');
  // 这里用 useMemo() 优化， 当 searchKey 不变当时候，key不需要计算. 
  // 注意 key 是否计算依赖于 searchKey
  const key = useMemo(() => searchKey.trim(), [searchKey]); 
  useEffect(() => {
    if (isLoading || cityData || !show) {
      return;
    }
    fetchCityData();
  }, [isLoading, cityData, show]);

  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={onBack}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-warpper">
          <input
            type="text"
            value={searchKey}
            placeholder="车站、城市的中文或拼音"
            className="search-input"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <span 
          className={classnames('search-clean', {
            hidden: key.length === 0
          })}
        >
          <i
            onClick={() => setSearchKey('')}
            className=" iconfont icon-clear"></i>
        </span>
      </div>
      <CityList cityData={cityData} onCitySelect={onCitySelect} searchKey={searchKey} />
    </div>
  )
});

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onCitySelect: PropTypes.func.isRequired,
};

export default CitySelector;
