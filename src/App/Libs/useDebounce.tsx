import { useCallback, useEffect, useRef, useState } from 'react';

import useDebouncedCallback from './useDebouncedCallback';

const valueEquality = (left: any, right: any) => {
  return left === right;
};

const useDebounce = (
  value: any,
  delay: number,
  options?: {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
    equalityFn?: (left: any, right: any) => boolean;
  },
): [any, () => void, () => void] => {
  const eq = options && options.equalityFn ? options.equalityFn : valueEquality;

  const [state, dispatch] = useState(value);
  const [callback, cancel, callPending] = useDebouncedCallback(
    useCallback((value) => dispatch(value), []),
    delay,
    options,
  );
  const previousValue = useRef(value);

  useEffect(() => {
    // We need to use this condition otherwise we will run debounce timer for the first render (including maxWait option)
    if (!eq(previousValue.current, value)) {
      callback(value);
      previousValue.current = value;
    }
  }, [value, callback, eq]);

  return [state, cancel, callPending];
};

export default useDebounce;
