import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Choose.scss';

const Choose = memo(props => {
    const { passengers, updatePassenger } = props;

    function createSeat(seatType) {
        return (
            <div>
                {passengers.map(passenger => {
                    return (
                        <p
                            data-text={seatType}
                            key={passenger.id}
                            className={classnames('seat', {
                                active: passenger.seat === seatType,
                            })}
                            onClick={() =>
                                updatePassenger(passenger.id, {
                                    seat: seatType,
                                })
                            }
                        >
                            <i className="icon iconfont">&#xe65e;</i>
                        </p>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="choose">
            <p className="tip">在线选座</p>
            <div className="container">
                <div className="seats">
                    <div>窗</div>
                    {createSeat('A')}
                    {createSeat('B')}
                    {createSeat('C')}
                    <div>过道</div>
                    {createSeat('D')}
                    {createSeat('F')}
                    <div>窗</div>
                </div>
            </div>
        </div>
    );
});

Choose.prototype = {
    passengers: PropTypes.array.isRequired,
    updatePassenger: PropTypes.func.isRequired,
};

export default Choose;
