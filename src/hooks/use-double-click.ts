import { useRef, useCallback } from 'react';

// ----------------------------------------------------------------------

type Props = {
  timeout?: number;
  click?: (e: React.SyntheticEvent) => void;
  doubleClick: (e: React.SyntheticEvent) => void;
};

export function useDoubleClick({ click, doubleClick, timeout = 250 }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clickTimeout = useRef<any>();

  const clearClickTimeout = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  };

  return useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      clearClickTimeout();
      if (click && event.detail === 1) {
        clickTimeout.current = setTimeout(() => {
          click(event);
        }, timeout);
      }
      if (event.detail % 2 === 0) {
        doubleClick(event);
      }
    },
    [click, doubleClick, timeout]
  );
}
