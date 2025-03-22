import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

export const useSocket = (projectId, onMessageReceived) => {
  const socketRef = useRef(null);
  const messageHandlerRef = useRef(onMessageReceived);

  useEffect(() => {
    messageHandlerRef.current = onMessageReceived;
  }, [onMessageReceived]);

  useEffect(() => {
    if (!projectId) return;

    // Create socket instance if it doesn't exist
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_API_URL, {
        auth: {
          token: localStorage.getItem("token"),
        },
        query: {
          projectId,
        },
        transports: ["websocket"],
      });
    }

    // Setup event listener with stable reference
    const messageHandler = (data) => messageHandlerRef.current(data);
    socketRef.current.on("project-message", messageHandler);

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.off("project-message", messageHandler);
        // Only disconnect if component unmounts or projectId changes
        if (!projectId) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      }
    };
  }, [projectId]); 

  const sendMessage = useCallback((eventName, data) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(eventName, data);
    }
  }, []);

  return { sendMessage };
};