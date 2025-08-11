import NavbarComponent from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { InfoCircle, Shield, UserBadgeCheck, WarningTriangle, Copyright } from 'iconoir-react';
import ParticlesBackground from './ParticlesBackground';

const sections = [
  {
    title: 'Use-Case Scope',
    icon: <InfoCircle color="#06b6d4" width={36} height={36} strokeWidth={2.2} />, // cyan-400
    content: (
      <>
        Nex-Migrate is designed for internal use within enterprise environments only.<br />
        It is intended for use by authorized IT personnel, system administrators, and verified end users for the purpose of assessing and managing Windows 11 migration readiness.
      </>
    )
  },
  {
    title: 'Liability Disclaimer',
    icon: <Shield color="#06b6d4" width={36} height={36} strokeWidth={2.2} />, // cyan-400
    content: (
      <>
        Use of Nex-Migrate is at your own risk.<br />
        The tool is provided "as-is" without warranties of any kind. The developers and associated organizations are not liable for any damage, data loss, or disruptions resulting from use of this platform.
      </>
    )
  },
  {
    title: 'Admin Responsibilities',
    icon: <UserBadgeCheck color="#06b6d4" width={36} height={36} strokeWidth={2.2} />, // cyan-400
    content: (
      <ul className="list-disc list-inside text-cyan-100">
        <li>Verify device eligibility before triggering migration scripts.</li>
        <li>Avoid triggering operations on devices not marked "Ready".</li>
        <li>Log all migration actions responsibly for audit and traceability.</li>
        <li>Ensure user communication and backup procedures are in place before actions are taken.</li>
      </ul>
    )
  },
  {
    title: 'Service Limitations',
    icon: <WarningTriangle color="#06b6d4" width={36} height={36} strokeWidth={2.2} />, // cyan-400
    content: (
      <ul className="list-disc list-inside text-cyan-100">
        <li>Nex-Migrate does not perform actual operating system installations; it simulates readiness checks.</li>
        <li>Assumes system data and compatibility inputs are accurate and up to date.</li>
        <li>Does not store or process sensitive personal data beyond basic device/user metadata.</li>
      </ul>
    )
  },
  {
    title: 'Copyright Notice',
    icon: <Copyright color="#06b6d4" width={36} height={36} strokeWidth={2.2} />, // cyan-400
    content: (
      <>
        © 2025 Nex-Migrate. All Rights Reserved.<br />
        Unauthorized distribution or duplication of this platform, or any part of it, is prohibited without written consent.
      </>
    )
  }
];

const TermsOfService = () => (
  <>
    <NavbarComponent />
    <ParticlesBackground />
    <div className="relative min-h-screen w-full py-16 px-4 flex flex-col items-center">
      <motion.div
        className="max-w-2xl w-full text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Terms of Service</h1>
        <p className="text-lg md:text-xl text-cyan-100 font-medium">
          Please review the following terms and conditions before using Nex-Migrate.
        </p>
        <div className="mx-auto mt-4 w-24 h-1 rounded-full bg-cyan-400/70 shadow-[0_0_12px_2px_#06b6d4]" />
      </motion.div>
      <div className="w-full max-w-3xl flex flex-col gap-10">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            className="bg-black border border-cyan-400/30 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div className="mb-3 flex items-center justify-center">
              {section.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">{section.title}</h2>
            <div className="text-base text-cyan-100 font-medium max-w-2xl mx-auto">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer />
  </>
);

export default TermsOfService;
