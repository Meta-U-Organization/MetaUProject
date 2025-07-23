
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient;

class WebSocketManager {

    constructor(io) {
        this.onlineUsers = {};
        this.io = io
    }

    addNewUser(userId, socketId) {
        this.onlineUsers[userId] = socketId;
    }

    deleteUser(userId) {
        if (userId in this.onlineUsers) {
            delete this.onlineUsers[userId];
        }
    }

    requestNotification(userId, type, description) {
        if (userId in this.onlineUsers) {
            this.io.to(this.onlineUsers[userId]).emit("getNotification", { type, description })
        }
    }

    async areaPost(userId, areaId, type, description) {
        const area = await prisma.area.findUnique({
            where: { id: areaId },
            include: {
                users: true
            }
        })
        for (let i = 0; i < area.users.length; i++) {
            if (area.users[i].id in this.onlineUsers && area.users[i].id !== userId) {
                this.io.to(this.onlineUsers[area.users[i].id]).emit("getNotification", { type, description })
            }
        }
    }
}
module.exports = WebSocketManager;