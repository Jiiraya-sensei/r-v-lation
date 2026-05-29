import { lazy, Suspense } from "react";

// Heavy particles engine (~147KB) loads only when this component is actually rendered.
const ParticlesImpl = lazy(() => import("./GoldParticlesImpl"));

const GoldParticles = ({ className = "" }: { className?: string }) => (
  <Suspense fallback={null}>
    <ParticlesImpl className={className} />
  </Suspense>
);

export default GoldParticles;
