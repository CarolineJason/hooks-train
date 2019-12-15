import React, {  memo} from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

const Options = memo(function Options(props){
  const {
    title,
    options,
    checkedMap,
  } = props;
  return (
    <div className="options">
      <h3>{title}</h3>
      <ul>
        {
          options && options.map((option) => {
            return (
              <Filter
                {...option}
                key={option.value}
                checked={option.value in checkedMap}
              />
            )
          })
        }
      </ul>
    </div>
  )
});

Options.prototype = {
  title: PropTypes.string.isRequired,
  checkedMap: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default Options;
