import React, { memo, useMemo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';

import './TimeSlider.scss';

const TimeSlider = memo(function TimeSlider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged,
  } = props;

  // 获取 左右2个 滑块的 dom 节点
  const startHandle = useRef();
  const endHandle = useRef();

  const lastStartX = useRef(); // 左侧滑块的上一次 x坐标
  const lastEndX = useRef(); // 右侧 滑块的上一次 x 坐标

  const range = useRef(); // 获取 slider 滑块的 宽度
  const rangeWidth = useRef();

  // 用 useRef() 函数保存 前一次的 currentStartHours 和 currentEndHours 的时间，然后和下一次渲染的时间 做比较
  const prevCurrentStartHours = useRef(currentStartHours);
  const prevCurrentEndHours = useRef(currentEndHours);


  const [start, setStart] = useState(() => {
    return currentStartHours / 24 * 100;
  });
  const [end, setEnd] = useState(() => {
    return currentEndHours / 24 * 100;
  });

  if (prevCurrentStartHours.current !== currentStartHours) {
    setStart((currentStartHours / 24 )* 100);
    prevCurrentStartHours.current = currentStartHours;
  }

  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24 )* 100);
    prevCurrentEndHours.current = currentEndHours;
  }

  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100;
    }

    if (start < 0) {
      return 0;
    }

    return start;
  }, [start]);

  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100;
    }

    if (end < 0) {
      return 0;
    }

    return end;
  }, [end]);

  const startHours = useMemo(() => {
    return Math.round(startPercent * 24 / 100);
  }, [startPercent]);

  const endHours = useMemo(() => {
    return Math.round(endPercent * 24 / 100);
  }, [endPercent]);

  const startText = useMemo(() => {
    return leftPad(startHours, 2, '0') + ':00'; 
  }, [startHours]);

  const endText = useMemo(() => {
    return leftPad(endHours, 2, '0') + ':00'; 
  }, [endHours]);

  const onStartTouchBegin = (e) => {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  }

  const onEndTouchBegin = (e) => {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  }

  const onStartTouchMove = (e) => {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastStartX.current;
    lastStartX.current = touch.pageX;
    setStart((start) => start + (distance / rangeWidth.current) * 100)
  }

  const onEndTouchMove = (e) => {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX;
    setEnd((end) => end + (distance / rangeWidth.current) * 100)
  }


  // 获取 可 滑动 区域的宽度
  useEffect(() => {
    rangeWidth.current = parseFloat(window.getComputedStyle(range.current).width);
  }, [])

  useEffect(() => {
    // 给 滑块 绑定 touchstart touchmove 事件
    startHandle.current.addEventListener('touchstart', onStartTouchBegin, false);
    startHandle.current.addEventListener('touchmove', onStartTouchMove, false);

    endHandle.current.addEventListener('touchstart', onEndTouchBegin, false);
    endHandle.current.addEventListener('touchmove', onEndTouchMove, false);

    // 清除函数 
    return () => {
      // 解绑事件
      startHandle.current.removeEventListener('touchstart', onStartTouchBegin, false);
      startHandle.current.removeEventListener('touchmove', onStartTouchMove, false);

      endHandle.current.removeEventListener('touchstart', onEndTouchBegin, false);
      endHandle.current.removeEventListener('touchmove', onEndTouchMove, false);
    }
    // 副作用 没有 依赖，说明 这个副作用 每次渲染 都会执行一次，因为每次渲染可能 dom 会 重构，有解绑事件 不会 导致 内存泄露 
  }); 

  useEffect(() => {
      onStartChanged(startHours);
  }, [startHours]);

  useEffect(() => {
      onEndChanged(endHours);
  }, [endHours]);


  return (
    <div className="options">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div className="slider-range" style={{
            left: startPercent + '%',
            width: endPercent - startPercent + '%',
          }}></div>
          <i ref={startHandle} className="slider-handle" style={{
            left: startPercent + '%'
          }}>
            <span>{startText}</span>
          </i>
          <i ref={endHandle} className="slider-handle" style={{
            left: endPercent + '%'
          }}>
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  )
});

TimeSlider.prototype = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired,
};

export default TimeSlider;