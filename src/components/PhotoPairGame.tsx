"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  "/heart-photos/1.webp",
  "/heart-photos/2.webp",
  "/heart-photos/3.jpg",
  "/heart-photos/4.webp",
  "/heart-photos/5.webp",
  "/heart-photos/6.webp",
  "/heart-photos/7.webp",
  "/heart-photos/8.webp",
  "/heart-photos/9.webp",
  "/heart-photos/10.webp",
  "/heart-photos/11.webp",
  "/heart-photos/12.webp",
  "/heart-photos/13.jpg",
  "/heart-photos/14.jpg",
  "/heart-photos/15.jpg",
  "/heart-photos/16.jpg",
  "/heart-photos/17.jpg",
  "/heart-photos/18.jpg",
];

const imagePairs = images.flatMap((img) => [img, img]);

const shuffleArray = (arr: string[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type Props = {
  handleShowProposal: () => void;
};

/* 💖 Love burst animation */
const LoveBurst = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    initial={{ scale: 0.3, opacity: 0.6 }}
    animate={{ scale: 1.8, opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="w-10 h-10 rounded-full bg-pink-400/40 blur-xl" />
  </motion.div>
);

export default function PhotoPairGame({ handleShowProposal }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [cards] = useState(() => shuffleArray(imagePairs));
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [message, setMessage] = useState("");
  const [showSkip, setShowSkip] = useState(false);
  const [unfurled, setUnfurled] = useState(false);

  /* ⏱️ Timer + messages */
  useEffect(() => {
    if (secondsLeft <= 0) {
      setShowSkip(true);
      return;
    }

    const t = setTimeout(() => {
      const elapsed = 120 - secondsLeft;
      if (elapsed === 30) setMessage("Take your time ❤️");
      if (elapsed === 60) setMessage("You’re doing great 💕");
      if (elapsed === 90) setMessage("Almost there cutie 🥰");
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [secondsLeft]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 6000);
    return () => clearTimeout(t);
  }, [message]);

  /* 🧩 Logic */
  const handleClick = (index: number) => {
    if (
      selected.length === 2 ||
      selected.includes(index) ||
      matched.includes(index) ||
      unfurled
    )
      return;

    if (selected.length === 1) {
      const first = selected[0];
      setSelected([first, index]);

      if (cards[first] === cards[index]) {
        setMatched((p) => [...p, first, index]);
        setTimeout(() => setSelected([]), 500);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    } else {
      setSelected([index]);
    }
  };

  useEffect(() => {
    if (matched.length === imagePairs.length && !unfurled) {
      setTimeout(handleShowProposal, 1500);
    }
  }, [matched, handleShowProposal, unfurled]);

  const handleSkip = () => {
    setUnfurled(true);
    setMatched([...Array(imagePairs.length).keys()]);
    setMessage("Congratulations 🎉 You completed the puzzle 💖");
    setTimeout(handleShowProposal, 2000);
  };

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">

      {/* ⏱️ TIMER */}
      <div className="absolute top-6 right-6 text-white text-lg">
        ⏳ {mins}:{secs}
      </div>

      {/* 💬 MESSAGE */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 left-6 text-white/90 text-sm bg-black/40 px-4 py-2 rounded-lg backdrop-blur"
        >
          {message}
        </motion.div>
      )}

      {/* 🆘 SKIP */}
      {showSkip && !unfurled && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 px-6 py-3 bg-pink-500 text-white rounded-xl shadow-lg hover:bg-pink-600 transition"
        >
          Skip Puzzle 💕
        </button>
      )}

      {/* 📝 HELPER TEXTS */}
      <div className="pointer-events-none absolute inset-0 flex justify-between items-end px-12 pb-12">
  <div className="text-white/70 text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
    Match<br />
    <span className="text-white">the photo pairs</span>
  </div>

  <div className="text-white/70 text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-right">
    to reveal<br />
    <span className="text-white">the surprise</span>
  </div>
</div>


      {/* 🧩 GRID */}
      <div className="grid grid-cols-9 gap-2 z-10">
        {heartLayout.flat().map((index, i) =>
          index !== null ? (
            <motion.div
              key={i}
              className="w-[11vh] h-[11vh] lg:w-20 lg:h-20 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleClick(index)}
            >
              <div className="relative w-full h-full rounded-md bg-gray-300 overflow-hidden">
                {(selected.includes(index) || matched.includes(index)) && (
                  <>
                    <LoveBurst />
                    <img
  src={cards[index]}
  alt=""
  className="w-full h-full object-cover rounded-md"
/>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <div key={i} className="w-[11vh] h-[11vh] lg:w-20 lg:h-20" />
          )
        )}
      </div>
    </div>
  );
}
