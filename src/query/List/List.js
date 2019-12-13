import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

import './List.scss';


const List = memo(function List(props) {
  const { list } = props;
  console.log('props:', props);
  return (
    <ul className="list">
      {
        list && list.map((item) => {
          return (
            <ListItem key={item.trainNumber} {...item} />
          )
        })
      }
    </ul>
  );
});

List.propTypes = {
  list: PropTypes.array.isRequired,
};

export default List;