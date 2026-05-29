import { useEffect, useRef, useState } from "react";
import { useVideoBackground } from "@/hooks/useVideoBackground";

interface VideoBackgroundProps {
  src: string;
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
 * - preload="none" until visible, then "auto" so playback starts smoothly.
 */
const VideoBackground = ({ src, poster, className, alt = "", heavy = false }: VideoBackgroundProps) => {
  const { enabled, isMobile } = useVideoBackground();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const useVideo = enabled && !(heavy && isMobile);

  useEffect(() => {
    if (!useVideo || !wrapperRef.current) return;
    const el = wrapperRef.current;
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
  }, [useVideo]);

  // Pause when off-screen to save CPU/battery once loaded
  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    const video = videoRef.current;
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

  if (!useVideo) {
    return (
      <img
        src={poster}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div ref={wrapperRef} className={className} style={{ position: "relative" }}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
          className={className}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={poster}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default VideoBackground;
