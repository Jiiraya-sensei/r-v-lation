import { useEffect, useRef, useState } from "react";
import { useVideoBackground } from "@/hooks/useVideoBackground";

interface VideoBackgroundProps {
  src: string;
  /** Optional mobile-specific video source (used when viewport < 768px) */
  mobileSrc?: string;
  poster: string;
  className?: string;
  alt?: string;
  /** Heavy videos fall back to poster on mobile to save bandwidth */
  heavy?: boolean;
}

/**
 * Renders a background video only when visible in the viewport.
 * - Falls back to the poster image on reduced motion, slow networks, or (when heavy) on mobile.
 * - Uses IntersectionObserver so off-screen videos never download.
 * - The poster image acts as the sentinel while shouldLoad is false, so the
 *   element is laid out (positioning, sizing) exactly like the final <video>.
 */
const VideoBackground = ({ src, mobileSrc, poster, className, alt = "", heavy = false }: VideoBackgroundProps) => {
  const { enabled, isMobile } = useVideoBackground();
  const elRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const activeSrc = isMobile && mobileSrc ? mobileSrc : src;
  const useVideo = enabled && !(heavy && isMobile);

  // Observe whichever element is currently mounted (poster placeholder, then video).
  useEffect(() => {
    if (!useVideo || shouldLoad || !elRef.current) return;
    const el = elRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [useVideo, shouldLoad]);

  // Pause when off-screen to save CPU/battery once loaded
  useEffect(() => {
    if (!shouldLoad || !(elRef.current instanceof HTMLVideoElement)) return;
    const video = elRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [shouldLoad]);

  if (!useVideo || !shouldLoad) {
    return (
      <img
        ref={(el) => { elRef.current = el; }}
        src={poster}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <video
      key={activeSrc}
      ref={(el) => { elRef.current = el; }}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      className={className}
      aria-hidden="true"
    >
      <source src={activeSrc} type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
