import React from 'react';

// More, smaller, and more numerous particles for full-page coverage
const particles = [
  // Row 1
  { top: '8%', left: '8%', size: 'w-6 h-6', color: 'bg-cyan-400', delay: 'animate-delay-0', extra: '' },
  { top: '10%', left: '25%', size: 'w-5 h-5', color: 'bg-blue-400', delay: 'animate-delay-200', extra: '' },
  { top: '12%', left: '45%', size: 'w-6 h-6', color: 'bg-white', delay: 'animate-delay-400', extra: '' },
  { top: '9%', left: '65%', size: 'w-5 h-5', color: 'bg-cyan-300', delay: 'animate-delay-600', extra: '' },
  { top: '11%', left: '85%', size: 'w-6 h-6', color: 'bg-blue-200', delay: 'animate-delay-800', extra: '' },
  // Row 2
  { top: '25%', left: '12%', size: 'w-5 h-5', color: 'bg-cyan-200', delay: 'animate-delay-400', extra: '' },
  { top: '28%', left: '32%', size: 'w-6 h-6', color: 'bg-cyan-400', delay: 'animate-delay-600', extra: '' },
  { top: '22%', left: '55%', size: 'w-5 h-5', color: 'bg-white', delay: 'animate-delay-200', extra: '' },
  { top: '27%', left: '75%', size: 'w-6 h-6', color: 'bg-cyan-300', delay: 'animate-delay-0', extra: '' },
  { top: '23%', left: '90%', size: 'w-5 h-5', color: 'bg-blue-400', delay: 'animate-delay-800', extra: '' },
  // Row 3
  { top: '45%', left: '5%', size: 'w-6 h-6', color: 'bg-white', delay: 'animate-delay-600', extra: '' },
  { top: '48%', left: '20%', size: 'w-5 h-5', color: 'bg-cyan-400', delay: 'animate-delay-400', extra: '' },
  { top: '52%', left: '40%', size: 'w-6 h-6', color: 'bg-blue-200', delay: 'animate-delay-0', extra: '' },
  { top: '50%', left: '60%', size: 'w-5 h-5', color: 'bg-cyan-200', delay: 'animate-delay-200', extra: '' },
  { top: '47%', left: '80%', size: 'w-6 h-6', color: 'bg-cyan-300', delay: 'animate-delay-800', extra: '' },
  // Row 4
  { top: '70%', left: '10%', size: 'w-5 h-5', color: 'bg-blue-400', delay: 'animate-delay-600', extra: '' },
  { top: '72%', left: '30%', size: 'w-6 h-6', color: 'bg-cyan-400', delay: 'animate-delay-400', extra: '' },
  { top: '75%', left: '50%', size: 'w-5 h-5', color: 'bg-white', delay: 'animate-delay-0', extra: '' },
  { top: '78%', left: '70%', size: 'w-6 h-6', color: 'bg-cyan-200', delay: 'animate-delay-200', extra: '' },
  { top: '73%', left: '90%', size: 'w-5 h-5', color: 'bg-blue-200', delay: 'animate-delay-800', extra: '' },
  // Row 5
  { top: '90%', left: '15%', size: 'w-6 h-6', color: 'bg-cyan-300', delay: 'animate-delay-600', extra: '' },
  { top: '92%', left: '35%', size: 'w-5 h-5', color: 'bg-cyan-400', delay: 'animate-delay-400', extra: '' },
  { top: '88%', left: '55%', size: 'w-6 h-6', color: 'bg-white', delay: 'animate-delay-0', extra: '' },
  { top: '91%', left: '75%', size: 'w-5 h-5', color: 'bg-blue-400', delay: 'animate-delay-200', extra: '' },
  { top: '89%', left: '95%', size: 'w-6 h-6', color: 'bg-cyan-200', delay: 'animate-delay-800', extra: '' },
];

const ParticlesBackground = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
    {particles.map((p, i) => (
      <span
        key={i}
        className={`absolute ${p.size} ${p.color} rounded-full blur-2xl opacity-90 ${p.delay} ${p.extra}`}
        style={{ top: p.top, left: p.left }}
      />
    ))}
  </div>
);

export default ParticlesBackground;