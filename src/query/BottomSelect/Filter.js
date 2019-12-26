import React, { memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Filter = memo(function(props) {
  const { name, checked, value, toggle } = props;
  // console.log(44);
  // console.log('props:', props);
  return (
    <li
      className={classnames('', { 'checked' : checked })}
      onClick={() => toggle(value)}
      >
      {name}
    </li>
  )
});

Filter.prototype = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Filter;