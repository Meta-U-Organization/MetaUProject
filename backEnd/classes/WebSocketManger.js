
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient;

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

    async areaPost(areaId, type, description) {
        const area = await prisma.area.findUnique({
            where: { id: areaId },
            include: {
                users: true
            }
        })
        // console.log(usersInArea.);
        // this.getUser(areaId);
        //will need to grab all users in area
        //will then perform a similair check as before with the getNotification
    }
}
module.exports = WebSocketManager;