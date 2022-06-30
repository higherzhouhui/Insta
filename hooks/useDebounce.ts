import {useRef, useCallback} from 'react';

// type Fn = (...args: any) => any

// export const useDebounce = <T extends Fn>(fn: T, delay: number = 300) => {
//     const ref = useRef<NodeJS.Timeout | null>(null)
//     return (...args: Parameters<T>) => {
//         if (ref.current) clearTimeout(ref.current)
//         ref.current = setTimeout(fn, delay, ...args)
//     }
// }

export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  deps: any[]
): [T, () => void] {
  const timer = useRef<number>();
  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback((...args) => {
    cancel();
    timer.current = window.setTimeout(() => {
      func(...args);
    }, delay);
  }, deps);
  return [run as T, cancel];
}
