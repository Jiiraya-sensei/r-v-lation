import { useEffect, useState } from "react";

/**
 * Returns true if background videos should play.
 * Disabled when:
 * - User prefers reduced motion
 * - Viewport is mobile (< 768px) — saves bandwidth and battery
 * - Device reports a slow connection (Save-Data or 2g/slow-2g)
 */
export const useVideoBackground = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const compute = () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // @ts-expect-error - non-standard but widely supported
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const slowNetwork =
        conn && (conn.saveData === true || ["slow-2g", "2g"].includes(conn.effectiveType));

      setEnabled(!reducedMotion && !slowNetwork);
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

  return enabled;
};
