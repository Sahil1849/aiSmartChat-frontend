import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = (projectId, onMessageReceived) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!projectId) return;

    socketRef.current = io(import.meta.env.VITE_API_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        projectId,
      },
      transports: ["websocket"],
    });

    socketRef.current.on("project-message", onMessageReceived);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("project-message", onMessageReceived);
        socketRef.current.disconnect();
      }
    };
  }, [projectId, onMessageReceived]);

  const sendMessage = (eventName, data) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    }
  };

  return { sendMessage };
};
