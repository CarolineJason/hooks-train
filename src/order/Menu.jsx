import React, { memo } from 'react';
import  PropTypes from 'prop-types';
import classnames from 'classnames';
import './Menu.scss';


const MenuItem = memo(function MenuItem(props) {
  const {
    onPress,
    title,
    value,
    active,
  } = props;

  console.log(111, props);
  return (
    <li
      className={classnames({active})}
      onClick={() => {onPress(value)}}
    >
      {title}
    </li>
  )
});

MenuItem.prototype = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  active: PropTypes.bool.isRequired,
};


const Menu = memo(function Menu(props) {
  const {
    show,
    options,
    onPress,
    hideMenu,
  } = props;

  console.log('menu..props:', props);

  return (
    <div>
      {
        show && <div className="menu-mask" onClick={() => hideMenu()}></div>
      }
      <div className={classnames('menu', { show })}>
        <div className="menu-title"></div>
        <ul>
          {
            options && options.map((option) => {
              return (
                <MenuItem
                  key={option.value}
                  onPress={onPress}
                  {
                    ...option
                  }
                />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
});

Menu.prototype = {
  show: PropTypes.bool.isRequired,
  options: PropTypes.array,
  onPress: PropTypes.func,
  hideMenu: PropTypes.func.isRequired,
};

export default Menu;
