import { motion } from "framer-motion";
import { Snowflake } from "lucide-react";

const Logo = () => {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 mb-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Icon */}
      <motion.div
        className="relative"
        animate={{ 
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 box-glow animate-pulse-glow">
          <Snowflake className="w-12 h-12 text-primary" />
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl -z-10" />
      </motion.div>

      {/* Title */}
      <div className="text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-display font-black text-glow tracking-wider"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-primary via-ice to-secondary bg-clip-text text-transparent">
            HAYATO INFO
          </span>
          <span className="ml-2">🥶</span>
        </motion.h1>
        <motion.p 
          className="mt-2 text-lg md:text-xl text-muted-foreground font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Free Fire Player Statistics Lookup
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Logo;
