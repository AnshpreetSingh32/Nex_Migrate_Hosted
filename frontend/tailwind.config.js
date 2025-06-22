const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    'animate-delay-0',
    'animate-delay-200',
    'animate-delay-400',
    'animate-delay-600',
    'animate-delay-800',
    'animate-spin-slow'
  ],
  theme: {
    extend: {
      animation: {
        'loading-bars': 'loading-bars 1s infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'delay-0': '',
        'delay-200': 'float-slow 6s ease-in-out infinite 0.2s',
        'delay-400': 'float-slow 6s ease-in-out infinite 0.4s',
        'delay-600': 'float-slow 6s ease-in-out infinite 0.6s',
        'delay-800': 'float-slow 6s ease-in-out infinite 0.8s',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'loading-bars': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.5)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
});

