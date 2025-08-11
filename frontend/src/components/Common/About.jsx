import NavbarComponent from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import { Link } from 'react-router-dom';
import {
  InfoCircle,
  Laptop,
  CheckCircle,
  Map,
  Stackoverflow,
  User,
  Compass
} from 'iconoir-react';

const timelineData = [
  {
    title: 'Introduction',
    icon: <InfoCircle color="#06b6d4" width={48} height={48} strokeWidth={2.2} />,
    bg: 'bg-black',
    content: (
      <>
        <span className="block text-2xl md:text-3xl font-bold mb-2 text-white">About Us – Nex-Migrate</span>
        <span className="block text-lg md:text-xl text-cyan-100">Enabling seamless enterprise readiness for Windows 11 migration with automation, analysis, and assurance.</span>
      </>
    )
  },
  {
    title: 'Project Overview',
    icon: <Laptop color="#06b6d4" width={48} height={48} strokeWidth={2.2} />,
    bg: 'bg-black',
    content: (
      <>
        <span className="block text-xl font-bold mb-2 text-white">What is Nex-Migrate?</span>
        <span className="block text-cyan-100">Nex-Migrate is an internal enterprise tool designed to assess device eligibility for Windows 11 migration. It helps IT teams make informed decisions and automate support actions to ensure a smooth and efficient upgrade process.</span>
      </>
    )
  },
  {
    title: 'Core Features',
    icon: <CheckCircle color="#06b6d4" width={48} height={48} strokeWidth={2.2} />,
    bg: 'bg-black',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
        <div className="bg-black/80 rounded-xl p-4 shadow text-white border border-cyan-400/30">
          <span className="font-bold">Eligibility Assessment</span>
          <div className="text-sm text-cyan-100">Evaluates device compatibility with Windows 11 requirements.</div>
        </div>
        <div className="bg-black/80 rounded-xl p-4 shadow text-white border border-cyan-400/30">
          <span className="font-bold">Automated Migration</span>
          <div className="text-sm text-cyan-100">Allows admins to trigger migration scripts and raise service requests.</div>
        </div>
        <div className="bg-black/80 rounded-xl p-4 shadow text-white border border-cyan-400/30">
          <span className="font-bold">App Reinstallation</span>
          <div className="text-sm text-cyan-100">Lets users verify and reinstall essential applications post-migration.</div>
        </div>
        <div className="bg-black/80 rounded-xl p-4 shadow text-white border border-cyan-400/30">
          <span className="font-bold">Reporting Dashboard</span>
          <div className="text-sm text-cyan-100">Provides real-time insights on migration progress across the organization.</div>
        </div>
      </div>
    )
  },
  {
    title: 'Our Journey',
    icon: <Map color="#06b6d4" width={48} height={48} strokeWidth={2.2} />,
    bg: 'bg-black',
    content: (
      <span className="block text-cyan-100">Nex-Migrate was developed during an internship at Fidelity International under the TechHub Remote Support team. The project aims to simulate a real-world enterprise environment focused on managing OS migrations efficiently.</span>
    )
  },
  {
    title: 'Technology Stack',
    icon: <Stackoverflow color="#06b6d4" width={48} height={48} strokeWidth={2.2} />,
    bg: 'bg-black',
    content: (
      <ul className="flex flex-wrap gap-3 justify-center mt-2">
        {['React.js','Node.js','Express.js','MySQL','Sequelize ORM','Tailwind CSS','JWT Authentication','ServiceNow API Integration'].map((tech, idx) => (
          <li key={idx} className="bg-black/80 text-cyan-100 rounded px-4 py-1 text-sm font-semibold shadow border border-cyan-400/40">{tech}</li>
        ))}
      </ul>
    )
  },
  {
    title: 'Meet the Developer',
    icon: <User color="#06b6d4" width={48} height={48} strokeWidth={2.2} />,
    bg: 'bg-black',
    content: (
      <span className="block text-cyan-100">Developed by Anshpreet Singh, a Software Developer Intern at Fidelity International, this project is a result of a strong interest in enterprise systems, automation, and real-world software engineering practices.</span>
    )
  },
  {
    title: 'Explore Nex-Migrate',
    icon: <Compass color="#06b6d4" width={48} height={48} strokeWidth={2.2} />,
    bg: 'bg-black',
    content: (
      <div className="flex flex-col items-center gap-4">
        <span className="block text-cyan-100 mb-2">Visit the Admin Panel to manage devices and trigger migrations.<br/>Visit the User Panel to view your device, reinstall apps, or get support.</span>
        <div className="flex gap-4">
          <Link to="/admin/dashboard" className="rounded bg-cyan-400 px-6 py-2 font-semibold text-white shadow border border-cyan-400 hover:shadow-cyan-400/60 hover:ring-2 hover:ring-cyan-400 transition">Admin Panel</Link>
          <Link to="/user/dashboard" className="rounded bg-white px-6 py-2 font-semibold text-black shadow border border-black/20 hover:shadow-cyan-400/60 hover:ring-2 hover:ring-cyan-400 transition">User Panel</Link>
        </div>
      </div>
    )
  }
];

const Timeline = () => (
  <div className="relative max-w-3xl mx-auto py-16 z-10">
    {/* Vertical line */}
    <div className="absolute left-1/2 top-0 h-full w-1 bg-cyan-400/30 -translate-x-1/2 z-0" />
    <div className="flex flex-col gap-16 relative z-10">
      {timelineData.map((step, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <motion.div
            key={idx}
            className={`flex flex-col md:flex-row items-center md:items-stretch ${isLeft ? 'md:flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            {/* Content */}
            <div className={`md:w-1/2 p-6 bg-black rounded-2xl shadow-xl border border-cyan-400/30 flex flex-col justify-center items-center text-center`}
              style={{ minHeight: 180 }}
            >
              <div className="mb-2 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
              <div className="text-base text-cyan-100">{step.content}</div>
            </div>
            {/* Timeline Dot */}
            <div className="flex flex-col items-center md:w-0 md:px-0 px-4">
              <span className="w-6 h-6 rounded-full bg-cyan-400 border-4 border-white shadow-lg z-20" />
              {idx < timelineData.length - 1 && (
                <span className="h-16 w-1 bg-cyan-400/30" />
              )}
            </div>
            {/* Spacer for alternate sides */}
            <div className="md:w-1/2" />
          </motion.div>
        );
      })}
    </div>
  </div>
);

const AboutPage = () => (
  <>
    <NavbarComponent />
    <ParticlesBackground />
    <div className="min-h-screen w-full">
      <Timeline />
      <Footer />
    </div>
  </>
);

export default AboutPage;
