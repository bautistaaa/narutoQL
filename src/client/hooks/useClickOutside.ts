import { MutableRefObject, useEffect } from 'react';
function useClickOutside(
  ref: MutableRefObject<HTMLDivElement>,
  handler: (e: Event) => void
) {
  useEffect(() => {
    const listener = (event: any) => {
      console.log(ref.current);
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
