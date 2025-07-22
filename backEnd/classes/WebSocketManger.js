
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

    requestNotification(userId, io) {
        if (userId in this.onlineUsers) {
            io.to(this.onlineUsers[userId]).emit("getNotification")
        }
    }
}
module.exports = WebSocketManager;