import { useVideoBackground } from "@/hooks/useVideoBackground";

interface VideoBackgroundProps {
  src: string;
  poster: string;
  className?: string;
  alt?: string;
  /** Heavy videos (>10MB) fall back to poster on mobile to save bandwidth */
  heavy?: boolean;
}

/**
 * Renders a background video on capable devices, otherwise falls back to a poster image.
 * - Lazy preload metadata only
 * - Disabled on slow networks or prefers-reduced-motion
 * - Heavy videos additionally disabled on mobile (<768px)
 */
const VideoBackground = ({ src, poster, className, alt = "", heavy = false }: VideoBackgroundProps) => {
  const { enabled, isMobile } = useVideoBackground();

  if (!enabled || (heavy && isMobile)) {
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
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      className={className}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
