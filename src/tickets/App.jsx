import React, { useEffect, useCallback, Suspense } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { dateTransform } from '../common/fp';
import { channelContext } from './context';
// import Loadable from 'react-loadable';
// import Loading from './Loading';

import useNav from '../common/useNav';
import Header from '../common/header';
import DateNav from '../common/dateNav/DateNav';
import Detail from '../common/Detail/Detail';
import Candidate from './Candidate';
import Schdelu from './Schdelu'; // import 引入 组件 是 同步 引入

import './App.scss';
import {
    setDepartDate,
    setDepartStation,
    setArriveStation,
    setTrainNumber,
    setSearchParsed,
    prevDate,
    nextDate,
    setDepartTimeStr,
    setArriveTimeStr,
    setArriveDate,
    setDurationStr,
    setTickets,
    toggleIsScheduleVisible,
} from './action';

// 用 lazy 组件 异步 引入 Schdelu 组件
// const Schdelu = lazy(() => import('./Schdelu.jsx'));

// const Schdelu = Loadable({
//   loader: () => import('./Schdelu.jsx'),
//   loading: Loading,
// });

function App(props) {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,
        dispatch,
    } = props;

    useEffect(() => {
        document.title = trainNumber;
    }, [trainNumber]);

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const { date, trainNumber, aStation, dStation } = queries;

        dispatch(setDepartDate(dateTransform(dayjs(date).valueOf())));
        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setSearchParsed(true));
    }, [dispatch]);

    useEffect(() => {
        if (!searchParsed) {
            return;
        }

        const url = new URI('/rest/ticket')
            .setSearch('date:', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('trainNumber', trainNumber)
            .toString();

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(result => {
                const { candidates, detail } = result;
                const {
                    departTimeStr,
                    arriveTimeStr,
                    arriveDate,
                    durationStr,
                } = detail;

                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setTickets(candidates));
            })
            .catch(err => {
                console.log('ticket:', err);
            });
    }, [searchParsed, departDate, trainNumber, dispatch]);

    const { prev, next, isPrevDisabled, isNextDisabled } = useNav(
        departDate,
        dispatch,
        prevDate,
        nextDate
    );

    // 返回 按钮
    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    const dispatchToggleIsScheduleVisible = () => {
        console.log('dispatchToggleIsScheduleVisible.....');
        dispatch(toggleIsScheduleVisible());
    };

    if (!searchParsed) {
        return null;
    }

    return (
        <div className="App">
            <div className="header-wrapper">
                <Header title={trainNumber} onBack={onBack} />
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
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    durationStr={durationStr}
                    // toggleIsScheduleVisible={dispatchToggleIsScheduleVisible}
                >
                    <span className="left"></span>
                    <span
                        className="schedule"
                        onClick={dispatchToggleIsScheduleVisible}
                    >
                        时刻表
                    </span>
                    <span className="right"></span>
                </Detail>
            </div>
            <channelContext.Provider
                value={{
                    trainNumber,
                    arriveStation,
                    departStation,
                    departDate,
                }}
            >
                <Candidate tickets={tickets} />
            </channelContext.Provider>
            {isScheduleVisible && (
                <div
                    className="mask"
                    onClick={() => dispatchToggleIsScheduleVisible()}
                >
                    <div className="schedule">
                        <Suspense fallback={<div>loading......</div>}>
                            <Schdelu
                                date={departDate}
                                trainNumber={trainNumber}
                                arriveStation={arriveStation}
                                departStation={departStation}
                            />
                        </Suspense>
                    </div>
                </div>
            )}
        </div>
    );
}

const mapState = state => {
    return state;
};

const mapDispatch = dispatch => {
    return {
        dispatch,
    };
};

export default connect(mapState, mapDispatch)(App);
