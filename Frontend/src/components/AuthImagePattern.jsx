import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  // floating chat bubbles
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 90}%`,
    delay: Math.random() * 5,
    size: Math.random() * 60 + 30,
  }));

  return (
    <div className="hidden lg:flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900">
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

      {/* 💬 floating bubbles (like chat messages) */}
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20"
          style={{
            width: bubble.size,
            height: bubble.size * 0.6,
            top: bubble.top,
            left: bubble.left,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}

      {/* ✨ glowing circle behind content */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 💎 main text card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/20 max-w-md text-center"
      >
        <motion.h2
          className="text-3xl font-bold mb-3 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-gray-300 mb-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {subtitle}
        </motion.p>

        {/* small glowing dots below */}
        <div className="flex justify-center gap-3 mt-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-blue-400/70 shadow-md"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
              transition={{
                duration: 1.5 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthImagePattern;
