import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css/normalize.css';
import './index.scss';

function Header(props) {
  const { onBack, title } = props;
  return (
    <div className="header">
      <div className="header-back" onClick={onBack}>
        <svg width="40" height="40">
          <polyline
            points="25,13 16,21 25,29"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="header-title">
        <h3>{title}</h3>
      </div>
    </div>
  )
}

Header.propTypes = {
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
