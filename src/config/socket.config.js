import { io } from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
    socketInstance = io(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem("token"),
        },
        query: {
            projectId,
        },
        // Force use of websocket transport
        transports: ["websocket"],
    });

    return socketInstance;
};

export const receiveMessage = (eventName, callback) => {
    if (socketInstance) {
        socketInstance.on(eventName, callback);
    }
};

export const sendMessage = (eventName, data) => {
    if (socketInstance) {
        socketInstance.emit(eventName, data);
    }
};
