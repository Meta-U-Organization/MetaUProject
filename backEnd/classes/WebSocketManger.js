
class WebSocketManager {

    constructor() {
        let onlineUsers = []
        this.onlineUsers = onlineUsers;
    }

    addNewUser(userId, socketId) {
        let i = 0;
        while (i < this.onlineUsers.length) {
            if (this.onlineUsers[i].userId === userId) {
                this.onlineUsers[i].socketId = socketId;
                break;
            }
            i++;
        }
        if (i === this.onlineUsers.length) {
            this.onlineUsers.push({ userId, socketId });
        }
    }

    deleteUser(userId) {
        const index = this.onlineUsers.findIndex(entry => entry.userId === userId);

        if (index !== -1) {
            this.onlineUsers.splice(index, 1);
        }
    }

    requestNotification(userId, io, title) {
        const entry = this.onlineUsers.filter(entry => entry.userId === userId);
        io.to(entry[0].socketId).emit("getNotification", `New Recipient for Item Titled ${title}`)
    }
}
module.exports = WebSocketManager;