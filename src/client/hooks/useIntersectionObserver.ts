import { MutableRefObject, useEffect, useState } from 'react';

interface IntersectionObserverArgs {
  root: MutableRefObject<HTMLElement>;
  target: MutableRefObject<HTMLElement>;
  onIntersect: () => Promise<any>;
  threshold: number;
  rootMargin: string;
  enabled: boolean;
}
const useIntersectionObserver = ({
  root,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: Partial<IntersectionObserverArgs>) => {
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          entry.isIntersecting && onIntersect();
        }),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    if (!node) {
      return;
    }

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [node, enabled]);

  return [setNode];
};

export default useIntersectionObserver;
