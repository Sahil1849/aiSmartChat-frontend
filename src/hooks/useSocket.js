import { useEffect, useRef } from "react";
import socket from "socket.io-client";

export const useSocket = (projectId, onMessageReceived) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!projectId) return;

    // Initialize socket connection
    socketRef.current = socket(import.meta.env.VITE_API_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        projectId,
      },
    });

    // Listen for incoming messages
    socketRef.current.on("project-message", onMessageReceived);

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off("project-message", onMessageReceived);
        socketRef.current.disconnect();
      }
    };
  }, [projectId, onMessageReceived]);

  // Function to send a message
  const sendMessage = (eventName, data) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    }
  };

  return { sendMessage };
};