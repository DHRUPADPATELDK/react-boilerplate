import { useEffect, useState } from 'react';

// Hook
export const useScrollDirection = () => {
  const [scrollPair] = useState([0, 0]);
  const [direction, setDirection] = useState('up');
  const [pageYOffset, setPageYOffset] = useState(null);

  const handleScroll = () => {
    if (window && window.pageYOffset) {
      setPageYOffset(window.pageYOffset);
    }
    if (scrollPair.length === 2) {
      scrollPair.shift();
    }
    scrollPair.push(window.pageYOffset);
    if (scrollPair[1] < scrollPair[0]) {
      setDirection('up');
    } else {
      setDirection('down');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [direction, pageYOffset];
};
