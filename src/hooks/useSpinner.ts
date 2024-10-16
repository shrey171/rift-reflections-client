import { useAppDispatch, useAppSelector, selectIsLoading, setSpinnerState } from "store";
type AsyncFunction<T extends any[]> = (...args: T) => Promise<any>;


export const useSpinner = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const setIsLoading = (isLoading: boolean) => {
    dispatch(setSpinnerState({ isLoading }));
  };

  function asyncWrapper<T extends any[]>(asyncFunction: AsyncFunction<T>): (...args: T) => Promise<any | void> {
    return async (...args: T) => {
      setIsLoading(true);
      try {
        return await asyncFunction(...args);
      } catch (err) {
        throw err
      } finally {
        setIsLoading(false);
      }
    };
  }


  return { isLoading, setIsLoading, asyncWrapper }
}