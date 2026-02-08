"use client";

import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";
import YesMessage from "./YesMessage";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

const collageImages = Array.from({ length: 18 }, (_, i) => {
  const jpgSet = [3, 13, 14, 15, 16, 17, 18];
  const ext = jpgSet.includes(i + 1) ? "jpg" : "webp";
  return `/heart-photos/${i + 1}.${ext}`;
});

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);

  // 🔑 KEY FIX
  const [isRunaway, setIsRunaway] = useState(false);
  const [position, setPosition] = useState({ top: "50%", left: "55%" });

  const getRandomPosition = () => {
    const padding = 120;
    return {
      top: `${Math.random() * (window.innerHeight - padding)}px`,
      left: `${Math.random() * (window.innerWidth - padding)}px`,
    };
  };

  useEffect(() => {
    if (step < 2) {
      const t = setTimeout(() => setStep((p) => p + 1), 1800);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    if (showFireworks) {
      const t = setTimeout(() => setShowFireworks(false), 8000);
      return () => clearTimeout(t);
    }
  }, [showFireworks]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setShowMessageBox(true);
    setStep(3);
  };

  const handleNoHover = () => {
    setIsRunaway(true);
    setPosition(getRandomPosition());
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="s0"
            className={`text-4xl font-semibold ${playfairDisplay.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Congratulations! You completed the game 💖
          </motion.h2>
        )}

        {step === 1 && (
          <motion.h2
            key="s1"
            className={`text-4xl font-semibold ${playfairDisplay.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            I have a surprise for you ✨
          </motion.h2>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            className="relative flex flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background */}
            <div className="fixed inset-0 grid grid-cols-6 gap-1 opacity-15 -z-10 pointer-events-none">
  {[...collageImages, ...collageImages].map((src, i) => (
    <div key={i} className="relative">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 33vw, 16vw"
      />
    </div>
  ))}
</div>


            <h2 className={`text-5xl font-semibold mb-6 ${playfairDisplay.className}`}>
              Will you be my Valentine? 💘
            </h2>

            <Image src="/sad_hamster.png" alt="Sad hamster" width={200} height={200} />

            {/* BUTTON ROW */}
            <div className="flex gap-6 mt-10 relative">
              <button
                onClick={handleYesClick}
                className="px-6 py-3 text-lg font-semibold rounded-xl
                bg-gradient-to-r from-pink-500 to-rose-500
                hover:scale-105 transition shadow-lg"
              >
                Yes, I will 🥰
              </button>

              <button
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                style={
                  isRunaway
                    ? {
                        position: "fixed",
                        top: position.top,
                        left: position.left,
                        zIndex: 50,
                      }
                    : {}
                }
                className="px-6 py-3 text-lg font-semibold rounded-xl
                bg-gradient-to-r from-gray-500 to-gray-600
                shadow-lg transition-all duration-300"
              >
                No, I won’t 😢
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="s3"
            className={`flex flex-col items-center text-center ${playfairDisplay.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-4xl font-semibold mb-2">
              Thank you for saying YES 💕
            </h2>

            <p className="text-sm mb-6">
              Leave me a message, I’ll read it with a smile 💌
            </p>

            <Image
              src="/hamster_jumping.gif"
              alt="Happy hamster"
              width={200}
              height={200}
              unoptimized
            />

            {showMessageBox && <YesMessage />}
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <Fireworks options={{ autoresize: true }} />
        </div>
      )}
    </div>
  );
}
