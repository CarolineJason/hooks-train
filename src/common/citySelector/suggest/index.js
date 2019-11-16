import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

// 搜索
function Suggest(props) {
  const {
    onCitySelect,
    searchKey,
  } = props;

  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then((data) => {
        const {
          result,
          searchKey: sKey,
        } = data;

        if (searchKey === sKey) {
          setResult(result);
        }
      });
  }, [searchKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {
          result && result.map((item) => {
            return (
              <li
                key={item.key}
                className="city-suggest-li"
                onClick={() => onCitySelect(item.key)}
              >
                {item.key}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

Suggest.prototype = {
  onCitySelect: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
};

export default Suggest;
