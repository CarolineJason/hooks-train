import React, { useMemo, memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './DateNav.scss';

// 顶部日期 导航组件
const DateNav = memo(function DateNav(props) {
  const {
    date,
    prev,
    next,
    isPrevDisabled,
    isNextDisabled
  } = props;

  const currentString = useMemo(() => {
    const d = dayjs(date);
    return d.format('M月D日 ') + d.locale('zh-cn').format('ddd');
  }, [date]);

  // console.log('date:', date);
  // console.log('currentString:', currentString);

  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classnames('nav-prev', {
          'nav-disabled': isPrevDisabled
        })}
      >
        前一天
      </span>
      <span className="nav-current">{currentString}</span>
      <span
        onClick={next}
        className={classnames('nav-next', {
          'nav-disabled': isNextDisabled
        })}
      >
        后一天
      </span>
    </div>
  );
});

DateNav.prototype = {
  date:PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
};

export default DateNav;
