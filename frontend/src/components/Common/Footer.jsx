import { ShieldCheck } from 'iconoir-react';
// Footer component styled to match the provided design and fix floating issue
const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-1 border-t-2 border-cyan-400/40 mt-auto">
      {/* Glowing top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-cyan-400/40 blur-lg pointer-events-none z-10" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4 w-full relative">
        {/* Footer links */}
        <div className="flex space-x-4 text-sm font-medium order-1 md:order-none">
          <a href="/about" className="transition-colors hover:text-cyan-400">About Us</a>
          <a href="/terms-of-service" className="transition-colors hover:text-cyan-400">Terms of Service</a>
          <a href="/privacy-policy" className="transition-colors hover:text-cyan-400">Privacy Policy</a>
        </div>
        {/* Central content with icon above text */}
        <div className="flex flex-col items-center justify-center mx-2 min-w-[220px] order-3 md:order-none mt-2 md:mt-0">
          <ShieldCheck color="#06b6d4" width={18} height={18} className="mb-0.5" />
          <span className="text-cyan-300 font-semibold text-sm whitespace-nowrap">Nex-Migrate &mdash; Secure. Private. Trusted.</span>
        </div>
        {/* Copyright */}
        <div className="text-sm text-gray-400 whitespace-nowrap order-2 md:order-none">© 2025 Nex-Migrate, All Rights Reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;