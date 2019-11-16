import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Header from '../header/index';

import './DateSelector.scss';

// 日期 选择 浮层
function DateSelector(props) {
  const {
    DateSelectorShow,
    onBack,
  } = props;
  console.log('DateSelector.....:', props);


  return (
    <div className={classnames('date-selector', { hidden: !DateSelectorShow })}>
      <Header title="日期选择" onBack={onBack} />
    </div>
  )
}

DateSelector.prototype = {
  DateSelectorShow: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DateSelector;
