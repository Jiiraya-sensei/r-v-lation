import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particlesOptions: ISourceOptions = {
  fpsLimit: 30,
  particles: {
    color: { value: ["#C9A961", "#E8C77E", "#FBF5E3"] },
    move: {
      enable: true,
      speed: 0.5,
      direction: "top",
      outModes: { default: "out" },
    },
    number: { value: 35, density: { enable: true } },
    opacity: {
      value: { min: 0.1, max: 0.6 },
      animation: { enable: true, speed: 0.5, startValue: "random" },
    },
    size: {
      value: { min: 1, max: 3 },
      animation: { enable: true, speed: 1, startValue: "random" },
    },
    shape: { type: "circle" },
  },
  detectRetina: true,
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: { number: { value: 15 } },
      },
    },
  ],
};

const GoldParticles = ({ className = "" }: { className?: string }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      className={`absolute inset-0 pointer-events-none ${className}`}
      options={particlesOptions}
    />
  );
};

export default GoldParticles;
