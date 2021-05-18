import { useEffect, useRef } from 'react';

export default function useFirstEffect(fn, data) {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fn();
    // TODO: How to return effect?
  }, data);
}
