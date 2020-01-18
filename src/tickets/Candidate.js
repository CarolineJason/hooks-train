import React, { memo, useState, useCallback, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import URI from 'urijs';
import { channelContext } from './context';
import './Candidate.scss';

const Channel = memo(function Channel(props) {
  const {
    name,
    desc,
    type,
  } = props;
  const {
    trainNumber,
    arriveStation,
    departStation,
    departDate
  } = useContext(channelContext);

  const url = useMemo(() => {
    return new URI('order.html')
      .setSearch('type', type)
      .setSearch('departDate', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .setSearch('arriveStation', arriveStation)
      .setSearch('departStation', departStation)
      .toString();
  }, [
    type,
    departDate,
    trainNumber,
    arriveStation,
    departStation
  ]);
  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <a href={url} className="buy-wrapper">
        <div className="buy">买票</div>
      </a>
    </div>
  )
});

Channel.prototype = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const Seat = memo(function Seat(props) {
  const { type, priceMsg, ticketsLeft, channels, expanded, onToggle, idx } = props;

  return (
    <li>
      <div className="bar" onClick={() => onToggle(idx)}>
        <span className="seat">{type}</span>
        <span className="price">
          <i>¥</i>
          {priceMsg}
        </span>
        <span className="btn">{expanded ? '预定' : '收起'}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
      >
        {
          channels.map((channel, index) => {
            return (
              <Channel key={channel.name} {...channel} type={type} />
            )
          })
        }
      </div>
    </li>
  );
});

Seat.prototype = {
  type: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  ticketLeft: PropTypes.string.isRequired,
  channels: PropTypes.array.isRequired,
  idx: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};


const Candidate = memo(function Candidate(props) {
  const {
    tickets,
  } = props;

  const [expandedIndex, setExpandedIndex] = useState(-1);
  const onToggle = useCallback((idx) => {
    setExpandedIndex(idx === expandedIndex ? '-1' : idx);
  }, [expandedIndex]);
  return (
    <div className="candidate">
      <ul>
        {
          tickets.map((ticket, idx) => {
            return (
              <Seat
                expanded={expandedIndex === idx}
                key={ticket.type}
                {...ticket}
                onToggle={onToggle}
                idx={idx}
              />
            )
          })
        }
      </ul>
    </div>
  )
});
export default Candidate;

Candidate.propTypes = {
  tickets: PropTypes.array.isRequired,
};

