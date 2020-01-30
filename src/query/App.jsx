import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import URI from 'urijs';
import dayjs from 'dayjs';
import { dateTransform } from '../common/fp';
import useNav from '../common/useNav';

// 引入 action
import {
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
    setSearchParsed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    prevDate,
    nextDate,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    setCheckedTicketsTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
} from './action';

import Header from '../common/header';
import DateNav from '../common/dateNav/DateNav';
import List from './List/List';
import BottomSelect from './BottomSelect/BottomSelect';
import './App.scss';
import './iconfont/iconfont.css';

function App(props) {
    const {
        trainList, // 从 props 中 解构 出 数据
        to,
        from,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        isFiltersVisible,

        // 第四个 tab 筛选浮层
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketsTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,

        dispatch, // 从 props 中 引入 dispatch
    } = props;

    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const { from, to, date, highSpeed } = queries;
        // console.log('queries:', queries);
        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(dateTransform(dayjs(date).valueOf())));
        dispatch(setHighSpeed(highSpeed === 'true'));
        dispatch(setSearchParsed(true));
    }, [dispatch]);

    useEffect(() => {
        if (!searchParsed) {
            return;
        } else {
            // fetch
            const url = new URI('/rest/query')
                .setSearch('from', from)
                .setSearch('to', to)
                .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
                .setSearch('highSpeed', highSpeed)
                .setSearch('orderType', orderType)
                .setSearch('onlyTickets', onlyTickets)
                .setSearch(
                    'checkedTicketsTypes',
                    Object.keys(checkedTicketsTypes)
                )
                .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes))
                .setSearch(
                    'checkedDepartStations',
                    Object.keys(checkedDepartStations)
                )
                .setSearch(
                    'checkedArriveStations',
                    Object.keys(checkedArriveStations)
                )
                .setSearch('departTimeStart', departTimeStart)
                .setSearch('departTimeEnd', departTimeEnd)
                .setSearch('arriveTimeStart', arriveTimeStart)
                .setSearch('arriveTimeEnd', arriveTimeEnd)
                .toString();

            fetch(url)
                .then(response => response.json())
                .then(resp => {
                    const {
                        dataMap: {
                            directTrainInfo: {
                                trains,
                                filter: {
                                    arrStation,
                                    depStation,
                                    ticketType,
                                    trainType,
                                    // arriTimeRange,
                                    // deptTimeRange,
                                    // station,
                                    // stationType,
                                },
                            },
                        },
                    } = resp;

                    dispatch(setTrainList(trains));
                    dispatch(setTicketTypes(ticketType));
                    dispatch(setTrainTypes(trainType));
                    dispatch(setDepartStations(depStation));
                    dispatch(setArriveStations(arrStation));
                });
        }
    }, [
        to,
        from,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketsTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        dispatch,
    ]);

    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
        departDate,
        dispatch,
        prevDate,
        nextDate
    );

    // 给bottom 组件 传 事件
    const dispatchToggleOrderType = useCallback(() => {
        dispatch(toggleOrderType());
    }, [dispatch]);
    const dispatchToggleHighSpeed = useCallback(() => {
        dispatch(toggleHighSpeed());
    }, [dispatch]);
    const dispatchToggleOnlyTickets = useCallback(() => {
        dispatch(toggleOnlyTickets());
    }, [dispatch]);
    const dispatchToggleIsFiltersVisile = useCallback(() => {
        dispatch(toggleIsFiltersVisible());
    }, [dispatch]);

    // 筛选条件 选择事件
    const dispatchSetCheckedTicketsTypes = ticketData => {
        dispatch(setCheckedTicketsTypes(ticketData));
    };

    const dispatchSetCheckedTrainTypes = trainData => {
        dispatch(setCheckedTrainTypes(trainData));
    };

    const dispatchSetCheckedDepartStations = departStationsData => {
        dispatch(setCheckedDepartStations(departStationsData));
    };

    const dispatchSetCheckedArriveStations = arriveStationsData => {
        dispatch(setCheckedArriveStations(arriveStationsData));
    };

    const dispatchSetDepartTimeStart = departTimeStartData => {
        dispatch(setDepartTimeStart(departTimeStartData));
    };

    const dispatchSetDepartTimeEnd = departTimeEndData => {
        dispatch(setDepartTimeEnd(departTimeEndData));
    };

    const dispatchSetArriveTimeStart = arriveTimeStartData => {
        dispatch(setArriveTimeStart(arriveTimeStartData));
    };

    const dispatchSetArriveTimeEnd = arriveTimeEndData => {
        dispatch(setArriveTimeEnd(arriveTimeEndData));
    };

    return (
        <div className="App">
            <div className="header-wrapper">
                <Header title={`${from} ➡ ${to}`} onBack={onBack} />
            </div>
            <div className="nav-wrapper">
                <DateNav
                    date={departDate}
                    prev={prev}
                    next={next}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                />
            </div>
            <List list={trainList} />

            <BottomSelect
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickets={onlyTickets}
                isFiltersVisible={isFiltersVisible}
                toggleOrderType={dispatchToggleOrderType}
                toggleHighSpeed={dispatchToggleHighSpeed}
                toggleOnlyTickets={dispatchToggleOnlyTickets}
                toggleIsFiltersVisible={dispatchToggleIsFiltersVisile}
                ticketTypes={ticketTypes} // 第四个筛选 弹窗 数据
                trainTypes={trainTypes}
                departStations={departStations}
                arriveStations={arriveStations}
                checkedTicketsTypes={checkedTicketsTypes}
                checkedTrainTypes={checkedTrainTypes}
                checkedDepartStations={checkedDepartStations}
                checkedArriveStations={checkedArriveStations}
                departTimeStart={departTimeStart}
                departTimeEnd={departTimeEnd}
                arriveTimeStart={arriveTimeStart}
                arriveTimeEnd={arriveTimeEnd}
                // 筛选条件 选择事件
                setCheckedTicketsTypes={dispatchSetCheckedTicketsTypes}
                setCheckedTrainTypes={dispatchSetCheckedTrainTypes}
                setCheckedDepartStations={dispatchSetCheckedDepartStations}
                setCheckedArriveStations={dispatchSetCheckedArriveStations}
                setDepartTimeStart={dispatchSetDepartTimeStart}
                setDepartTimeEnd={dispatchSetDepartTimeEnd}
                setArriveTimeStart={dispatchSetArriveTimeStart}
                setArriveTimeEnd={dispatchSetArriveTimeEnd}
            />
        </div>
    );
}

const mapState = state => {
    // console.log('query...state:', state);
    return state;
};

const mapDispatch = dispatch => {
    // console.log('query...dispatch:', dispatch);
    return { dispatch }; // 直接返回 dispatch 到 props中
};

export default connect(mapState, mapDispatch)(App);
