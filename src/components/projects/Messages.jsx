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
    <div className="flex-1 bg-[#DCD0FF] overflow-y-auto p-4">
      {isProjectLoading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender?._id === userData?._id
              ? "justify-end"
              : "justify-start"
              } mb-4`}
          >
            <div
              className={`p-3 space-y-2 rounded-md max-w-[75%] ${msg.sender?._id === userData?._id
                ? "bg-purple-600 text-white"
                : "bg-gray-300 text-gray-600"
                }`}
            >
              <small className="block mb-1">~ {msg.sender?.email}</small>
              <p>{msg.message}</p>
              <small className={`block text-xs mt-1 text-gray-300 ${msg.sender?._id === userData?._id
                ? "text-gray-300"
                : " text-purple-500"
                }`}>
                {msg.timestamp}
              </small>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>

    <div className="p-4 flex items-center gap-2 bg-gray-100">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
        className="w-full p-2 rounded-md border outline-none focus:ring-2 focus:ring-purple-500"
        onKeyDown={(e) => e.key === "Enter" && send(e)}
      />
      <button
        onClick={send}
        disabled={!inputValue.trim()}
        className={`p-2 rounded-md ${inputValue.trim()
          ? "bg-purple-600 text-white hover:bg-purple-700"
          : "bg-gray-300 text-gray-500"
          }`}
      >
        <IoIosSend size={22} />
      </button>
    </div>
  </>
);
