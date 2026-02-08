"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
  onSuccess: () => void;
};

const questions = [
  {
    question: "What did we eat on our first date?",
    answer: "dosa",
    hint: "South Indian 👀",
  },
  {
    question: "Which name of mine do I like when you say it?",
    answer: "abhishek",
    hint: "My second name 😉",
  },
  {
    question: "On which festival did we meet for the very first time?",
    answer: "janmashtami",
    hint: "Krishna's festival 🦚",
  },
];

type Particle = {
  x: number;
  scale: number;
  duration: number;
  delay: number;
};

export default function LittleLoveCheck({ onSuccess }: Props) {
  const [curr, setCurr] = useState(0);
  const [input, setInput] = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  /* 🌸 Create particles AFTER mount (fix hydration) */
  useEffect(() => {
    const p: Particle[] = Array.from({ length: 18 }).map(() => ({
      x: Math.random() * window.innerWidth,
      scale: Math.random() * 0.6 + 0.4,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  /* 🎴 Card tilt */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  const checkAnswer = () => {
    const userAns = input.trim().toLowerCase();
    const correctAns = questions[curr].answer;

    if (userAns === correctAns) {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 700);

      setInput("");
      setWrongCount(0);
      setShowHint(false);

      if (curr === questions.length - 1) {
        setTimeout(onSuccess, 700);
      } else {
        setCurr(curr + 1);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      const next = wrongCount + 1;
      setWrongCount(next);
      if (next >= 2) setShowHint(true);
    }
  };

  const progress = ((curr + 1) / questions.length) * 100;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">

      {/* 🌑 VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.85)_100%)] z-10" />

      {/* 💖 PARTICLES */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute text-pink-400 opacity-20 text-3xl"
            initial={{ x: p.x, y: "110vh", scale: p.scale }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      {/* 💎 CARD */}
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-pink-400/30 shadow-[0_0_50px_rgba(236,72,153,0.3)] p-8 text-white text-center transform-gpu"
      >
        {/* PROGRESS */}
        <div className="mb-6">
          <div className="h-2 w-full bg-white/20 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="tracking-widest text-pink-300 text-sm mb-2">
          A LITTLE LOVE CHECK 💖
        </p>

        <h3 className="text-2xl font-semibold mb-6">
          {questions[curr].question}
        </h3>

        <motion.input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
          animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          placeholder="Type your answer..."
          className="w-full px-4 py-3 mb-4 rounded-xl text-black outline-none focus:ring-4 focus:ring-pink-400/40"
        />

        {showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-pink-300 mb-3"
          >
            💡 Hint: {questions[curr].hint}
          </motion.p>
        )}

        <button
          onClick={checkAnswer}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-[1.04] transition shadow-lg"
        >
          Unlock 💌
        </button>

        <p className="text-xs mt-4 opacity-70">
          Question {curr + 1} of {questions.length}
        </p>

        {showHearts && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-4xl pointer-events-none"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            💖 💕 💘
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
