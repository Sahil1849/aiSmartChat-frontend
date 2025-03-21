import React, { useState, useEffect } from "react";
import MarkDown from "markdown-to-jsx";
import { Bot } from "lucide-react";

export const AIResponses = ({ aiResponses, isGenerating }) => {
  const [localResponses, setLocalResponses] = useState([]);
  const [showGenerating, setShowGenerating] = useState(false);

  useEffect(() => {
    setShowGenerating(isGenerating);
  }, [isGenerating]);

  useEffect(() => {
    setLocalResponses(aiResponses);
  }, [aiResponses]);

  return (
    <div
      id="chatBg"
      className="flex-1 h-screen overflow-y-auto overflow-x-hidden bg-black/95 px-6 py-4 relative"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(30, 64, 175, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)',
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-black/20 pointer-events-none" />

      {/* AI Responses container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">

        {/* Existing responses */}
        {localResponses.map((res, idx) => (
          <div
            key={idx}

            className="relative group"
          >
            <div className="absolute inset-0 bg-blue-800/10 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70 overflow-hidden transition-all duration-300 hover:border-blue-500/40">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-50" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-blue-400 font-medium">AI Assistant</h3>
                  <small className="text-gray-400">{res.timestamp}</small>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <MarkDown className="text-gray-100">{res.message}</MarkDown>
              </div>
            </div>
          </div>
        ))}

        {/* Generating indicator */}
        {showGenerating && (
          <div

            className="relative group"
          >
            <div className="absolute inset-0 bg-blue-800/10 rounded-2xl blur-xl" />
            <div className="relative p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-blue-400 font-medium">AI Assistant</h3>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <span>Generating response</span>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};