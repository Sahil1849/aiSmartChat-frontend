import React from "react";
import { IoIosSend } from "react-icons/io";

export const Messages = ({
  messages,
  userData,
  inputValue,
  setInputValue,
  send,
  isProjectLoading,
  messagesEndRef,
}) => (
  <>
    <div
      id="chatBg"
      className="flex-1 bg-black/95 overflow-y-auto p-4 border-r border-slate-700 relative"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(30, 64, 175, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

      {isProjectLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-blue-500">Loading messages...</div>
        </div>
      ) : (
        <div className="space-y-6 relative z-10">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender?._id === userData?._id ? "justify-end" : "justify-start"
                } items-end gap-2`}
            >
              {msg.sender?._id !== userData?._id && (
                <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-sm">
                  {msg.sender?.email.charAt(0).toUpperCase()}
                </div>
              )}

              <div
                className={`group relative p-4 rounded-2xl max-w-[60%] transition-all duration-200 ${msg.sender?._id === userData?._id
                  ? "bg-blue-800 text-white rounded-br-none"
                  : "bg-zinc-800/80 text-gray-100 rounded-bl-none"
                  }`}
              >
                <p className="text-sm font-medium mb-1 opacity-80">
                  {msg.sender?.email}
                </p>
                <p className="whitespace-pre-wrap break-words text-base">
                  {msg.message}
                </p>
                <span className={`absolute bottom-1 ${msg.sender?._id === userData?._id ? "-left-16" : "-right-16"
                  } text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender?._id === userData?._id && (
                <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-sm">
                  {userData?.email.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>

    <div className="p-4 bg-black border-r border-t border-slate-700">
      <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message... (Use @ai to ask AI)"
          className="w-full px-4 pr-12 py-3 rounded-full bg-zinc-800/50 border border-blue-900/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
          onKeyDown={(e) => e.key === "Enter" && send(e)}
        />
        <button
          onClick={send}
          disabled={!inputValue.trim()}
          className={`absolute right-2 p-2 rounded-full transition-all duration-200 ${inputValue.trim()
            ? "bg-blue-800 text-white hover:bg-blue-700"
            : "bg-zinc-700 text-gray-400 cursor-not-allowed"
            }`}
        >
          <IoIosSend size={20} />
        </button>
      </div>
    </div>
  </>
);