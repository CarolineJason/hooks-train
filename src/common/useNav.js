import { useCallback } from 'react';
import { dateTransform } from '../common/fp';

// 自定义 hooks 函数
export default function useNav(departDate, dispatch, prevDate, nextDate) {
    const isPrevDisabled = dateTransform(departDate) <= dateTransform();
    const isNextDisabled =
        dateTransform(departDate) - dateTransform() > 20 * 86400 * 1000;

    const prev = useCallback(() => {
        if (isPrevDisabled) {
            return;
        }
        dispatch(prevDate());
    }, [dispatch, isPrevDisabled, prevDate]);

    const next = useCallback(() => {
        if (isNextDisabled) {
            return;
        }
        dispatch(nextDate());
    }, [dispatch, isNextDisabled, nextDate]);

    return {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    };
}
