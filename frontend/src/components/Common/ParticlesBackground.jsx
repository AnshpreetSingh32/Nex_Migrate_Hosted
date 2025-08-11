import React, { useMemo } from 'react';

// Number of particles
const PARTICLE_NUM = 100;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const ParticlesBackground = () => {
  // Generate particle data only once
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_NUM }).map((_, i) => {
      const size = randomBetween(6, 12); // px
      const left = randomBetween(0, 100); // vw
      const startY = randomBetween(100, 110); // vh
      const endY = -randomBetween(100, 130); // vh
      const moveDuration = randomBetween(7000, 11000); // ms
      const moveDelay = randomBetween(0, 11000); // ms
      const circleDelay = randomBetween(0, 4000); // ms;
      return {
        size,
        left,
        startY,
        endY,
        moveDuration,
        moveDelay,
        circleDelay,
        key: i,
      };
    });
  }, []);

  return (
    <>
      <style>{`
        body {
          background-image: radial-gradient(#021027, #000000);
        }
        .particle-bg-container {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 0;
        }
        .circle-container {
          position: absolute;
          will-change: transform;
        }
        .circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          mix-blend-mode: screen;
          background-image: radial-gradient(
            hsl(180, 100%, 80%),
            hsl(180, 100%, 80%) 10%,
            hsla(180, 100%, 80%, 0) 56%
          );
          animation: fade-frames 2s infinite, scale-frames 2s infinite;
        }
        @keyframes fade-frames {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes scale-frames {
          0% { transform: scale3d(0.4, 0.4, 1); }
          50% { transform: scale3d(2.2, 2.2, 1); }
          100% { transform: scale3d(0.4, 0.4, 1); }
        }
      `}</style>
      <div className="particle-bg-container">
        {particles.map(p => (
          <div
            key={p.key}
            className="circle-container"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}vw`,
              top: `0`,
              animationName: `move-frames-${p.key}`,
              animationDuration: `${p.moveDuration}ms`,
              animationDelay: `${p.moveDelay}ms`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
            }}
          >
            <style>{`
              @keyframes move-frames-${p.key} {
                from {
                  transform: translate3d(${p.left}vw, ${p.startY}vh, 0);
                }
                to {
                  transform: translate3d(${p.left}vw, ${p.endY}vh, 0);
                }
              }
            `}</style>
            <div
              className="circle"
              style={{
                animationDelay: `${p.circleDelay}ms`,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ParticlesBackground;