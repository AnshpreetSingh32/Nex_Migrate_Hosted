import NavbarComponent from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import {
  Database,
  Lock,
  Send,
  User,
  Mail,
  ShieldCheck
} from 'iconoir-react';

const faqs = [
  {
    question: 'What data do we collect?',
    icon: <Database color="#06b6d4" width={28} height={28} strokeWidth={2.2} />, // cyan-400
    answer: (
      <>
        Nex-Migrate collects limited technical metadata required to assess device readiness for Windows 11 migration, including:
        <ul className="list-disc list-inside mt-2 text-cyan-100/90">
          <li>Device name, OS version, hardware configuration</li>
          <li>Installed applications (names and versions)</li>
          <li>Basic user identifiers (e.g., user ID, department, location – no personal details)</li>
        </ul>
      </>
    )
  },
  {
    question: 'How do we store & secure data?',
    icon: <Lock color="#06b6d4" width={28} height={28} strokeWidth={2.2} />, // cyan-400
    answer: (
      <ul className="list-disc list-inside text-cyan-100/90">
        <li>All data is stored in a secure MySQL database hosted within internal enterprise infrastructure.</li>
        <li>Access is strictly role-based (e.g., Admins only).</li>
        <li>Industry-standard encryption and access control mechanisms are enforced.</li>
        <li>Regular audits are performed to prevent unauthorized access or breaches.</li>
      </ul>
    )
  },
  {
    question: 'Do we share your data?',
    icon: <Send color="#06b6d4" width={28} height={28} strokeWidth={2.2} />, // cyan-400
    answer: (
      <>
        We do not share any collected data with third parties.<br />
        All device and user data remains strictly internal to the enterprise environment for migration planning purposes only.
      </>
    )
  },
  {
    question: 'What are your rights as a user?',
    icon: <User color="#06b6d4" width={28} height={28} strokeWidth={2.2} />, // cyan-400
    answer: (
      <ul className="list-disc list-inside text-cyan-100/90">
        <li>Request a review of the device data associated with you</li>
        <li>Opt-out of data collection (where applicable)</li>
        <li>Request deletion of your device records from the Nex-Migrate platform</li>
        <li>Such requests can be submitted via internal service channels.</li>
      </ul>
    )
  },
  {
    question: 'Who do I contact for privacy concerns?',
    icon: <Mail color="#06b6d4" width={28} height={28} strokeWidth={2.2} />, // cyan-400
    answer: (
      <>
        For any concerns related to data privacy or misuse, users can contact the IT Privacy Officer or open a ServiceNow request under the <span className="font-semibold text-cyan-300">“Privacy & Compliance”</span> category.
      </>
    )
  }
];

const bubbleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12 } })
};

const Privacypolicy = () => (
  <>
    <NavbarComponent />
    <ParticlesBackground />
    <div className="min-h-screen w-full py-16 px-4 flex flex-col items-center overflow-x-hidden">
      <motion.div
        className="max-w-2xl w-full text-center mb-12 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Privacy Policy</h1>
        <p className="text-lg md:text-xl text-cyan-100 font-medium">
          Your privacy and data security are our top priorities at Nex-Migrate.
        </p>
        <div className="mx-auto mt-4 w-24 h-1 rounded-full bg-cyan-400/70 shadow-[0_0_12px_2px_#06b6d4]" />
      </motion.div>
      <div className="w-full max-w-2xl flex flex-col gap-8 z-10">
        {faqs.map((faq, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={faq.question}
              className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={bubbleVariants}
            >
              <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl shadow-xl px-6 py-5 flex flex-col items-start gap-2 relative
                ${isLeft ? 'bg-black border border-cyan-400/20 ml-0 md:ml-8' : 'bg-black border border-cyan-400/20 mr-0 md:mr-8'}
                after:absolute after:top-6 after:w-4 after:h-4 after:bg-black after:border-cyan-400/20 after:border after:rotate-45
                ${isLeft ? 'after:-left-2 after:border-r-0 after:border-b-0' : 'after:-right-2 after:border-l-0 after:border-t-0'}`}
                style={{ boxShadow: isLeft ? '0 2px 16px 0 #06b6d4, 0 1px 8px 0 #000' : '0 2px 16px 0 #06b6d4, 0 1px 8px 0 #000' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {faq.icon}
                  <span className="font-semibold text-white text-base md:text-lg">{faq.question}</span>
                </div>
                <div className="text-base text-cyan-100 font-medium">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-16 w-full flex flex-col items-center z-10">
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <ShieldCheck color="#06b6d4" width={32} height={32} />
          <span className="text-cyan-300 font-semibold">Nex-Migrate &mdash; Secure. Private. Trusted.</span>
        </motion.div>
      </div>
    </div>
    <Footer />
  </>
);

export default Privacypolicy;
