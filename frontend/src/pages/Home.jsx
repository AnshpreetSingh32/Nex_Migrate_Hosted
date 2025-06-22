import { Link } from 'react-router-dom';
import NavbarComponent from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import ParticlesBackground from '../components/Common/ParticlesBackground';
import { Popover, PopoverHandler, PopoverContent, Typography } from "@material-tailwind/react";
import { desc } from 'framer-motion/client';

// Dynamically import all images from the assets folder
const images = import.meta.glob('../assets/*.png', { eager: true });

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const featureDetails = [
  {
    title: 'Automated Eligibility Checks',
    desc: 'Instant device assessments based on real-time readiness metrics.',
    image: images['../assets/Feature_1.png'].default, // Access the default property
    title2: 'Smart Device Readiness Assessment',
    desc2: 'Nex-Migrate uses real-time telemetry and pre-defined metrics to instantly determine if a device is eligible for migration. It evaluates parameters such as OS version, hardware compatibility, free storage, and performance score to ensure readiness before initiating Windows 11 migration.'
  },
  {
    title: 'Smart Migration Triggers',
    desc: 'Trigger scripts or actions for eligible systems at the right time.',
    image: images['../assets/Feature_2.png'].default, // Access the default property
    title2: 'Scripted Migrations for Maximum Efficiency',
    desc2: 'Once a device is marked eligible, Nex-Migrate triggers PowerShell-based scripts remotely. These scripts handle OS installation preparation, user notifications, and ensure minimal manual intervention for IT teams, enabling automated and scalable device migration.'
  },
  {
    title: 'User-Friendly Reinstall Dashboard',
    desc: 'View installed apps and easily reinstall them post-migration.',
    image: images['../assets/Feature_3.png'].default, // Access the default property
    title2: 'Seamless App Reinstallation Post-Migration',
    desc2: 'Users can view a list of previously installed apps from their Windows 10 device and easily reinstall them post-migration using our intuitive dashboard. The experience is designed to be zero-stress, preserving productivity and user autonomy.'
  },
  {
    title: 'ServiceNow Integration',
    desc: 'Auto-generate service requests for incompatible systems.',
    image: images['../assets/Feature_4.png'].default, // Access the default property
    title2: 'Automated Support for Incompatible Devices',
    desc2: 'When a device is deemed incompatible, Nex-Migrate automatically creates a support ticket in ServiceNow. This ensures that employees with unsupported systems get timely provisioning for new hardware or alternate migration paths without any manual escalation.'
  }
];

const howItWorksDetails = [
  {
    title: 'Device Check',
    desc: 'Gather system information from each user device.',
    image: images['../assets/Work_1.png'].default,
    title2: 'Real-Time System Information Retrieval',
    desc2: 'Nex-Migrate begins by collecting vital system details like CPU, RAM, disk space, OS version, and TPM status from each user\'s machine. This information is securely fetched and stored for compatibility analysis — all in real-time and with zero user intervention.'
  },
  {
    title: 'Eligibility Assessment',
    desc: 'Determine compatibility with Windows 11 standards.',
    image: images['../assets/Work_2.png'].default,
    title2: 'Smart Compatibility Analyzer',
    desc2: 'The collected data is evaluated against Windows 11 system requirements. Devices are classified as Ready, Needs Review, or Not Compatible, based on CPU generation, TPM version, and hardware performance. This ensures smooth and risk-free migrations.'
  },
  {
    title: 'Trigger Migration',
    desc: 'Launch migration scripts or create support requests.',
    image: images['../assets/Work_3.png'].default,
    title2: 'Automated Script Execution & Escalation',
    desc2: 'Eligible devices receive a migration script push using remote execution tools. Ineligible devices automatically trigger a ServiceNow ticket for hardware refresh or manual review — removing bottlenecks and reducing manual IT intervention.'
  },
  {
    title: 'User Confirmation',
    desc: 'Allow users to verify apps and reinstall essentials.',
    image: images['../assets/Work_4.png'].default,
    title2: 'App Reinstallation & Verification Portal',
    desc2: 'After the OS is upgraded, users log in to confirm and reinstall their previously used applications through a user-friendly interface. This ensures they get back to work faster, with all essential tools readily available.'
  }
];

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavbarComponent />

      {/* Hero Section */}
      <div className="relative flex justify-center items-center min-h-[60vh] bg-black px-4">
        <ParticlesBackground />
        <motion.div
          className="w-full max-w-2xl bg-white/80 border border-white/30 rounded-2xl shadow-2xl p-10 text-center backdrop-blur-md relative z-10 overflow-hidden"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ boxShadow: '0 0 32px 0 rgba(255,255,255,0.10), 0 4px 32px 0 rgba(0,0,0,0.25)' }}
        >
          {/* Glowing border accent */}
          <div className="absolute -inset-1 rounded-2xl pointer-events-none z-0" style={{ boxShadow: '0 0 32px 4px #fff, 0 0 8px 2px #00f0ff' }} />
          <motion.h1
            className="relative z-10 text-4xl md:text-5xl font-extrabold mb-4 text-black tracking-tight"
            style={{ textShadow: '0 0 12px #fff, 0 0 2px #00f0ff' }}
          >
            Simplify Your Windows 11 Migration Journey
          </motion.h1>
          <motion.p className="relative z-10 text-lg md:text-xl mb-8 text-black/80">
            Effortless device readiness, smart migration triggers, and seamless user experience.
          </motion.p>
          <motion.div className="flex justify-center gap-4 relative z-10" initial="hidden" animate="visible" variants={stagger}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login-user"
                className="inline-flex items-center justify-center rounded-md bg-black px-7 py-2.5 text-base font-semibold text-white shadow-lg border border-white/20 transition-transform duration-150 hover:shadow-cyan-400/60 hover:ring-2 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/user/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-white px-7 py-2.5 text-base font-semibold text-black shadow-lg border border-black/20 transition-transform duration-150 hover:shadow-cyan-400/60 hover:ring-2 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              >
                View Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 text-black"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Key Features
        </motion.h2>
        <div className="mx-auto mb-12 w-32 h-1 rounded-full bg-cyan-400/70 shadow-[0_0_12px_2px_#06b6d4]" />
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {featureDetails.map((feature, idx) => (
            <Popover key={idx}>
              <PopoverHandler>
                <motion.div
                  className="relative bg-black border border-cyan-400/40 shadow-lg rounded-2xl px-7 py-10 flex flex-col items-center justify-center text-white overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.16, delay: idx * 0.06, type: 'spring', stiffness: 800, damping: 38 }}
                  whileHover={{ scale: 1.035 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="mb-4 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-100 font-medium text-sm">
                    {feature.desc}
                  </p>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-400/30 rounded-full" />
                </motion.div>
              </PopoverHandler>
              <PopoverContent className="z-[999] grid w-[36rem] grid-cols-1 sm:grid-cols-2 sm:w-[36rem] w-full overflow-hidden p-0 bg-black/80 border border-cyan-400/50 shadow-[0_0_12px_2px_#06b6d4] rounded-lg">
                <div className="p-4">
                  <Typography color="white" className="mb-2 text-lg font-bold underline">
                    {feature.title2}
                  </Typography>
                  <Typography
                    variant="small"
                    color="cyan-100"
                    className="mb-14 font-normal text-cyan-100"
                  >
                    {feature.desc2}
                  </Typography>
                </div>
                <div className="min-h-full !w-full p-3 flex items-center justify-center bg-cyan-400/10">
                  <img
                    src={feature.image}
                    alt="feature image"
                    className="h-fit w-full rounded-lg object-cover shadow-[0_0_8px_2px_#06b6d4]"
                  />
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </motion.div>
      </section>

      {/* Workflow Snapshot */}
      <section className="py-20 px-4 bg-black text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          How It Works
        </motion.h2>
        <div className="mx-auto mb-12 w-32 h-1 rounded-full bg-cyan-400/70 shadow-[0_0_12px_2px_#06b6d4]" />
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {howItWorksDetails.map((step, idx) => (
            <Popover key={idx}>
              <PopoverHandler>
                <motion.div
                  className="relative bg-white border border-cyan-400/40 shadow-lg rounded-2xl px-7 py-10 flex flex-col items-center justify-center text-black overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.16, delay: idx * 0.06, type: 'spring', stiffness: 800, damping: 38 }}
                  whileHover={{ scale: 1.035 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="mb-4 flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-500 text-2xl font-extrabold shadow-[0_0_8px_0_#06b6d4]">
                      {idx + 1}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-black tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-gray-700 font-medium text-sm">
                    {step.desc}
                  </p>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-400/30 rounded-full" />
                </motion.div>
              </PopoverHandler>
              <PopoverContent className="z-[999] grid w-[36rem] grid-cols-1 sm:grid-cols-2 sm:w-[36rem] w-full overflow-hidden p-0 bg-white/80 border border-cyan-400/50 shadow-[0_0_12px_2px_#06b6d4] rounded-lg">
                <div className="p-4">
                  <Typography color="black" className="mb-2 text-lg font-bold underline">
                    {step.title2}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray-700"
                    className="mb-14 font-normal text-gray-700"
                  >
                    {step.desc2}
                  </Typography>
                </div>
                <div className="min-h-full !w-full p-3 flex items-center justify-center bg-cyan-400/10">
                  <img
                    src={step.image}
                    alt="step image"
                    className="h-fit w-full rounded-lg object-cover shadow-[0_0_8px_2px_#06b6d4]"
                  />
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 text-black"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          What People Are Saying
        </motion.h2>
        <div className="mx-auto mb-12 w-32 h-1 rounded-full bg-cyan-400/70 shadow-[0_0_12px_2px_#06b6d4]" />
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, type: 'spring', stiffness: 600, damping: 32 }}
        >
          <div className="bg-black border border-cyan-400/40 shadow-lg rounded-2xl px-8 py-10 max-w-2xl mx-auto text-white text-center">
            <blockquote className="text-2xl md:text-3xl italic font-medium mb-4">
              "Nex-Migrate reduced our Windows migration planning time by 60%. It's a game-changer for enterprise IT!"
            </blockquote>
            <p className="mt-2 text-cyan-100 text-sm">— IT Manager, CandorTech Corp</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
