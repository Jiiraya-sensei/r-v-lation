import { useEffect, useState } from "react";

/**
 * Returns video playback state.
 * - `enabled`: false when reduced motion or slow connection
 * - `isMobile`: true when viewport < 768px (used to skip heavy videos)
 */
export const useVideoBackground = () => {
  const [state, setState] = useState({ enabled: false, isMobile: false });

  useEffect(() => {
    const compute = () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;
      // @ts-expect-error - non-standard but widely supported
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const slowNetwork =
        conn && (conn.saveData === true || ["slow-2g", "2g"].includes(conn.effectiveType));

      setState({ enabled: !reducedMotion && !slowNetwork, isMobile });
    };

    compute();
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", compute);
    window.addEventListener("resize", compute);
    return () => {
      mql.removeEventListener("change", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return state;
};
