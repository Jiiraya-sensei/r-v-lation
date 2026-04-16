import { useVideoBackground } from "@/hooks/useVideoBackground";

interface VideoBackgroundProps {
  src: string;
  poster: string;
  className?: string;
  alt?: string;
}

/**
 * Renders a background video on capable devices, otherwise falls back to a poster image.
 * - Lazy preload metadata only
 * - Disabled on mobile, slow networks, or prefers-reduced-motion
 */
const VideoBackground = ({ src, poster, className, alt = "" }: VideoBackgroundProps) => {
  const enabled = useVideoBackground();

  if (!enabled) {
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
