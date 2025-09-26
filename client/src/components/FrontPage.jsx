import React, { useState, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import TimeTable from "./components/TimeTable.jsx";
import {
  Building,
  Users,
  CalendarCheck,
  Sparkles,
  Zap,
  Cpu,
  Brain,
  Rocket,
  ClipboardCheck,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const features = [
  {
    icon: <Building className="w-12 h-12 text-purple-700 drop-shadow-[0_0_15px_rgba(104,29,148,0.8)]" />,
    title: "Maximized Classroom Utilization",
    desc: "Quantum-powered room allocation ensuring 100% efficiency with zero conflicts.",
    color: "purple-700",
  },
  {
    icon: <Users className="w-12 h-12 text-pink-600 drop-shadow-[0_0_15px_rgba(204,65,122,0.8)]" />,
    title: "Balanced Workload",
    desc: "AI-driven faculty distribution with stress-free scheduling algorithms.",
    color: "pink-600",
  },
  {
    icon: <CalendarCheck className="w-12 h-12 text-cyan-700 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />,
    title: "Adaptive Scheduling",
    desc: "Neural networks handling NEP 2020 and multidisciplinary complexity.",
    color: "cyan-700",
  },
  {
    icon: <Sparkles className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />,
    title: "Optimized Outcomes",
    desc: "Machine learning ensures perfect timetables with cosmic precision.",
    color: "yellow-400",
  },
];

const parameters = [
  "Quantum classroom mapping",
  "Neural batch processing",
  "AI subject optimization",
  "Dynamic class allocation",
  "Smart frequency analysis",
  "Faculty availability matrix",
  "Predictive leave modeling",
  "Priority slot management",
];

const stats = [
  { number: "99.8%", label: "Conflict Resolution", icon: <Zap className="w-8 h-8" />, color: "purple-700" },
  { number: "10x", label: "Faster Processing", icon: <Cpu className="w-8 h-8" />, color: "pink-600" },
  { number: "100%", label: "Room Utilization", icon: <Brain className="w-8 h-8" />, color: "cyan-700" },
  { number: "∞", label: "Possibilities", icon: <Rocket className="w-8 h-8" />, color: "yellow-400" },
];

const glowColors = {
  "purple-700": "rgba(104,29,148,0.8)",
  "pink-600": "rgba(204,65,122,0.8)",
  "cyan-700": "rgba(6,182,212,0.8)",
  "yellow-400": "rgba(250,204,21,0.8)",
};

function SectionWrapper({ children, glowColor }) {
  const [hoveredSide, setHoveredSide] = useState(null);
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const distances = {
      left: x,
      right: rect.width - x,
      top: y,
      bottom: rect.height - y,
    };
    const side = Object.entries(distances).reduce((a, b) => (b[1] < a[1] ? b : a))[0];
    setHoveredSide(side);
  };

  const onMouseLeave = () => setHoveredSide(null);

  const styles = {
    left: { boxShadow: `-4px 0 8px -2px ${glowColor}`, borderLeftColor: glowColor },
    right: { boxShadow: `4px 0 8px -2px ${glowColor}`, borderRightColor: glowColor },
    top: { boxShadow: `0 -4px 8px -2px ${glowColor}`, borderTopColor: glowColor },
    bottom: { boxShadow: `0 4px 8px -2px ${glowColor}`, borderBottomColor: glowColor },
  };

  return (
    <Tilt
      glareEnable
      glareColor="rgba(255,255,255,0.1)"
      scale={1.02}
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      transitionSpeed={2000}
      className="w-4/5 mx-auto my-12 rounded-3xl bg-black/90 backdrop-blur-xl relative"
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="rounded-3xl p-8 transition-colors duration-300"
        style={{
          background: "rgba(255 255 255 / 0.05)",
          borderStyle: "solid",
          borderWidth: hoveredSide ? "2px" : "0px", // Hide border normally; show 2px on hover side.
          borderColor: hoveredSide ? glowColor : "transparent",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease, border-width 0.3s ease",
          ...(hoveredSide ? styles[hoveredSide] : {}),
        }}
      >
        {children}
      </div>
    </Tilt>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/90 border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text text-transparent">
            🌌 CosmicScheduler
          </motion.h1>
          <ul className="flex gap-8 font-semibold">
            {["Home", "Problem", "Solution", "Features", "Parameters", "Contact"].map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="cursor-pointer hover:text-transparent hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-600 hover:bg-clip-text transition-all duration-300">
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <SectionWrapper glowColor={glowColors["purple-700"]}>
        <div className="pt-32 pb-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }} className="mb-8">
            <div className="text-8xl mb-4 animate-pulse">🌟</div>
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6">
              <span className="text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text drop-shadow-[0_0_50px_rgba(104,29,148,0.8)] animate-pulse">
                COSMIC
              </span><br />
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">TIMETABLE</span><br />
              <span className="text-transparent bg-gradient-to-r from-cyan-700 via-purple-700 to-pink-600 bg-clip-text drop-shadow-[0_0_50px_rgba(6,182,212,0.8)]">
                SCHEDULER
              </span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-3xl max-w-4xl mx-auto text-gray-300 leading-relaxed mb-12 drop-shadow-lg">
              Experience the future of scheduling with our <span className="text-transparent bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text font-bold">AI-powered cosmic engine</span> that eliminates conflicts and maximizes efficiency across the universe.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              {stats.map(({ number, label, icon, color }, i) => (
                <div key={i} className="text-center">
                  <div className={`text-transparent bg-gradient-to-r from-${color} to-${color} bg-clip-text mb-2`}>
                    {icon}
                  </div>
                  <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{number}</div>
                  <div className="text-gray-300 font-semibold">{label}</div>
                </div>
              ))}
            </motion.div>
            <motion.button whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }} whileTap={{ scale: 0.95 }}
              className="px-12 py-6 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 font-black text-xl shadow-[0_0_50px_rgba(104,29,148,0.8)] hover:shadow-[0_0_100px_rgba(104,29,148,1)] border-2 border-white/20 transition-all duration-500">
              🚀 LAUNCH COSMIC SCHEDULER
            </motion.button>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Problem Section */}
      <SectionWrapper glowColor={glowColors["pink-600"]}>
        <div className="py-20">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl font-black text-center mb-12">
            THE <span className="text-transparent bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text drop-shadow-[0_0_30px_rgba(248,113,113,0.8)]">CHAOS</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-lg rounded-3xl p-8 shadow-[0_0_50px_rgba(248,113,113,0.3)]">
            <p className="text-xl text-center text-gray-300 leading-relaxed">
              Manual scheduling creates a <span className="text-red-400 font-bold">black hole</span> of conflicts, wasted resources, and frustrated users. With NEP 2020's complexity, traditional methods collapse under their own gravitational pull of inefficiency.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Solution Section */}
      <SectionWrapper glowColor={glowColors["cyan-700"]}>
        <div className="py-20">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl font-black text-center mb-12">
            OUR <span className="text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]">COSMIC SOLUTION</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-lg rounded-3xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
            <p className="text-xl text-center text-gray-300 leading-relaxed">
              Our <span className="text-green-400 font-bold">quantum AI engine</span> processes infinite scheduling possibilities instantly, delivering perfectly optimized timetables that adapt to any complexity with cosmic precision and zero conflicts.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Features List */}
      <SectionWrapper glowColor={glowColors["purple-700"]}>
        <div className="py-20">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl font-black text-center mb-16 text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text">
            COSMIC FEATURES
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon, title, desc, color }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <SectionWrapper glowColor={glowColors[color]}>
                  <div className="text-center mb-6">{icon}</div>
                  <h3 className={`text-2xl font-black mb-4 text-${color}`}>{title}</h3>
                  <p className="text-gray-300">{desc}</p>
                </SectionWrapper>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Parameters Section */}
      <SectionWrapper glowColor={glowColors["pink-600"]}>
        <div className="py-20">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl font-black text-center mb-16 text-transparent bg-gradient-to-r from-cyan-700 via-purple-700 to-pink-600 bg-clip-text">
            QUANTUM PARAMETERS
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parameters.map((param, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <SectionWrapper glowColor={glowColors["pink-600"]}>
                  <ClipboardCheck className="w-10 h-10 text-cyan-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-300 font-semibold leading-relaxed">{param}</p>
                </SectionWrapper>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper glowColor={glowColors["purple-700"]}>
        <div className="py-20 text-center">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl font-black mb-16 text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text">
            CONTACT THE COSMOS
          </motion.h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
            {[
              { icon: <Mail className="w-12 h-12 text-cyan-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] mx-auto" />, title: "Email", text: "cosmic@scheduler.universe" },
              { icon: <Phone className="w-12 h-12 text-pink-600 drop-shadow-[0_0_15px_rgba(204,65,122,0.8)] mx-auto" />, title: "Phone", text: "+91 9876543210" },
              { icon: <MapPin className="w-12 h-12 text-purple-700 drop-shadow-[0_0_15px_rgba(104,29,148,0.8)] mx-auto" />, title: "Location", text: "NIT Warangal, Earth" },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <SectionWrapper glowColor={glowColors["purple-700"]}>
                  <div className="mb-6 animate-bounce">{c.icon}</div>
                  <h3 className="text-2xl font-black mb-4 text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text">{c.title}</h3>
                  <p className="text-gray-300 font-semibold text-lg">{c.text}</p>
                </SectionWrapper>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/20 bg-black/90 backdrop-blur-xl relative z-10">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-gray-400 text-lg font-semibold">
          © {new Date().getFullYear()} 🌌 Cosmic Timetable Scheduler - <span className="text-transparent bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text">Powered by Quantum AI</span>
        </motion.p>
      </footer>
    </div>
  );
}
