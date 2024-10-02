import { useState } from 'react';
import Head from 'next/head';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Network, Layers, Atom } from "lucide-react";
import AINewsAnalyzer from './AINewsAnalyzer';

export default function LandingPage() {
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunched(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Head>
        <title>AI News Analyzer</title>
        <meta name="description" content="Decode the news landscape with quantum-inspired algorithms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black opacity-50"></div>

      {!isLaunched ? (
        <>
          <main className="relative z-10">
            <section className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Decode the News Landscape
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-300">
                  Harness quantum-inspired algorithms to unravel complex narratives
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6" onClick={handleLaunch}>
                  Explore the Matrix
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </section>

            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <TechFeature
                    icon={<Network className="h-12 w-12 text-blue-500" />}
                    title="Quantum Narrative Mapping"
                    description="Uncover hidden connections in global events"
                  />
                  <TechFeature
                    icon={<Layers className="h-12 w-12 text-purple-500" />}
                    title="Hyperdimensional Data Synthesis"
                    description="Fuse multi-source intelligence for deeper insights"
                  />
                  <TechFeature
                    icon={<Atom className="h-12 w-12 text-green-500" />}
                    title="Cognitive Spectrum Analysis"
                    description="Decode complex emotional landscapes in real-time"
                  />
                </div>
              </div>
            </section>
          </main>

          <footer className="relative z-10 bg-gray-900/50 py-8 backdrop-blur-sm">
            <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
              Empowering informed decisions through advanced AI
            </div>
          </footer>

          <div className="fixed inset-0 z-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                backgroundColor: ["#3b82f6", "#9333ea", "#ec4899"],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-green-500 to-pink-500 rounded-full opacity-20"
              animate={{
                scale: [1.3, 1, 1.3],
                rotate: [360, 0],
                backgroundColor: ["#10b981", "#f43f5e", "#3b82f6"],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <ParticleEffect />
        </>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <AINewsAnalyzer />
        </div>
      )}
    </div>
  );
}

function TechFeature({ icon, title, description }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 20px rgba(0, 125, 255, 0.8)" }}
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
}

function ParticleEffect() {
  return (
    <div className="fixed inset-0 z-0">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 rounded-full opacity-20"
          style={{
            width: Math.random() * 6 + 1 + "px",
            height: Math.random() * 6 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -1500],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: Math.random() * 12 + 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
