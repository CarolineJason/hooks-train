import React, { memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Filter = memo(function(props) {
  const { name, checked } = props;
  return (
    <li className={classnames('', { 'checked' : checked })}>{name}</li>
  )
});

Filter.prototype = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Filter;