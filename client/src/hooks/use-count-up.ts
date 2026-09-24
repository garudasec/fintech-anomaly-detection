import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "./use-reduced-motion";

/** Eases a number from 0 (or the previous value) to `target`. Respects reduced motion. */
export function useCountUp(target: number, duration = 1100) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);

  return value;
}
