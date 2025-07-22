
class WebSocketManager {

    constructor() {
        this.onlineUsers = {};
    }

    addNewUser(userId, socketId) {
        this.onlineUsers[userId] = socketId;
    }

    deleteUser(userId) {
        if (userId in this.onlineUsers) {
            delete this.onlineUsers[userId];
        }
    }

    requestNotification(userId, io, type, description) {
        if (userId in this.onlineUsers) {
            io.to(this.onlineUsers[userId]).emit("getNotification", { type, description })
        }
    }
}
module.exports = WebSocketManager;