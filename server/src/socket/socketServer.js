// Seperate Socket Logic

const onlineUsers = new Map();

export function setUpSocketServer(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("Registered user:", userId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
}

console.log("Current online users:", [...onlineUsers.entries()]);

export function getUserSocketId(userId) {
  return onlineUsers.get(userId);
}
