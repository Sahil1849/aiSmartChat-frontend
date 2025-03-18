import React, { useState, useEffect } from "react";
import MarkDown from "markdown-to-jsx";
import { motion } from "framer-motion";

export const AIResponses = ({ aiResponses, isGenerating }) => {
  const [localResponses, setLocalResponses] = useState([]);
  const [showGenerating, setShowGenerating] = useState(false);

  useEffect(() => {
    // Directly mirror the isGenerating state without delay
    setShowGenerating(isGenerating);
  }, [isGenerating]);

  useEffect(() => {
    setLocalResponses(aiResponses);
  }, [aiResponses]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 space-y-4 relative"
      style={{
        backgroundImage: "url('/projects/chatBg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* AI Responses container */}
      <div className="relative z-10">
        {/* Existing responses */}
        {localResponses.map((res, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-transparent backdrop-blur-xl space-y-6 rounded-xl border border-purple-100 shadow-sm mb-4"
          >
            <small className="block text-xs font-semibold text-white mb-2">
              ~ AI Assistant
            </small>
            <MarkDown className="prose text-white">{res.message}</MarkDown>
            <small className="text-gray-300 block text-end">
              {res.timestamp}
            </small>
          </motion.div>
        ))}

        {/* Generating indicator */}
        {showGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-transparent backdrop-blur-xl rounded-xl border border-purple-100 shadow-sm mb-4"
          >
            <small className="block text-xs font-semibold text-white mb-2">
              ~ AI Assistant
            </small>
            <p className="text-white animate-pulse">Generating...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};