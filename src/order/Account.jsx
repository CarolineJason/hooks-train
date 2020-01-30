import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Account.scss';

const Account = memo(props => {
    const { price = 0, length } = props;

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="account">
            <div
                onClick={() => setExpanded(!expanded)}
                className={classnames('price', { expanded })}
            >
                <div className="money">{length * price}</div>
                <div className="amount">支付金额</div>
            </div>
            <div className="button">提交订单</div>
            <div
                onClick={() => setExpanded(false)}
                className={classnames('layer', { hidden: !expanded })}
            ></div>
            <div className={classnames('detail', { hidden: !expanded })}>
                <div className="title">车票订单详情</div>
                <ul>
                    <li>
                        <span>火车票</span>
                        <span>¥{price}</span>
                        <span>&#xD7;</span>
                        <span>{length}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
});

Account.prototype = {
    price: PropTypes.number,
    length: PropTypes.number.isRequired,
};

export default Account;
