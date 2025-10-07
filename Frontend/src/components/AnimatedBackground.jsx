import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 90}%`,
    delay: Math.random() * 5,
    size: Math.random() * 80 + 40,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900">
      {/* 🌈 animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-blue-500/20 to-purple-500/20 blur-3xl"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "300% 300%",
        }}
      />

      {/* 💬 floating chat bubbles */}
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10"
          style={{
            width: bubble.size,
            height: bubble.size * 0.6,
            top: bubble.top,
            left: bubble.left,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}

      {/* glowing circles */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
