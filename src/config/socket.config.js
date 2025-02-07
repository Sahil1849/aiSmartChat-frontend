import socket from "socket.io-client"

let socketInstance = null;

// Initialize socket connection
export const initializeSocket = (projectId) => {

    socketInstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem("token"),

        },
        query: {
            projectId
        },
    })

    return socketInstance;
}

// Receive message from server
export const receiveMessage = (eventName, callback) => {
    socketInstance.on(eventName, callback);
    console.log(callback)
}

// Send message to server
export const sendMessage = (eventName, data) => {
    
    socketInstance.emit(eventName, data);
}