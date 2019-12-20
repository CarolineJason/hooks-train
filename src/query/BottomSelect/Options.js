import React, { useCallback, memo} from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

const Options = memo(function Options(props){
  const {
    title,
    options,
    checkedMap,
    update, // 更新 上一级 组件的 缓存 useState 的数据
  } = props;

  console.log('options33333:', props);
  // 切换 每一个 被选中的元素
  const toggle = useCallback((value) => {
    const newCheckedMap = {...checkedMap};
    if (value in checkedMap) {
      delete newCheckedMap[value];
    } else {
      newCheckedMap[value] = true;
    }
    update(newCheckedMap);
  }, [checkedMap, update]);

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
                toggle={toggle}
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
  update: PropTypes.func.isRequired,
};

export default Options;
