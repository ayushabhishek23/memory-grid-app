"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function YesMessage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          message,
          from_name: "Your Valentine 💖",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSent(true);
    } catch (err) {
      alert("Something went wrong 😢 Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-10 w-full max-w-md bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-white text-center"
    >
      {!sent ? (
        <>
          <h3 className="text-2xl font-semibold mb-4">
            Leave me a message 💌
          </h3>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something from your heart..."
            className="w-full h-32 p-3 rounded-xl text-black outline-none mb-4"
          />

          <button
            onClick={sendEmail}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 font-semibold hover:scale-105 transition"
          >
            {loading ? "Sending..." : "Send Message 💖"}
          </button>
        </>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl"
        >
          Message sent 💕  
          I’ll treasure it forever 🥰
        </motion.p>
      )}
    </motion.div>
  );
}
