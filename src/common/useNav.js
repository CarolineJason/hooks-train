export default function useNav(departDate, dispatch, prevDate, nextDate) {
  const isPrevDisabled = dateTransform(departDate) <= dateTransform();
  const isNextDisabled = dateTransform(departDate) - dateTransform() > 20 * 86400 * 1000

  const prev = useCallback(() => {
    if (isPrevDisabled) {
      return;
    }
    dispatch(prevDate());
  }, [isPrevDisabled]);

  const next = useCallback(() => {
    if (isNextDisabled) {
      return;
    }
    dispatch(nextDate());
  }, [isNextDisabled]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  }
}