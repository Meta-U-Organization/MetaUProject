
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient;

class WebSocketManager {

    constructor(io) {
        this.onlineUsers = {};
        this.io = io
        const timer = 24 * 60 * 60 * 1000;
        this.intervalId = setInterval(() => this.timedFunc(), timer)
    }

    async timedFunc() {
        //will need to grab posts
        const now = new Date(Date.now()).getTime();
        const allDonations = await prisma.donationPost.findMany({
            include: {
                possibleRecipients: true
            }
        })
        const filteredDonations = allDonations.filter(donation =>
            donation.possibleRecipients.length > 2 &&
            now - donation.timeCreated.getTime() > (3 * 24 * 60 * 60 * 1000));
        for (let i = 0; i < filteredDonations.length; i++) {
            if (filteredDonations[i].userId in this.onlineUsers) {
                this.io.to(this.onlineUsers[filteredDonations[i].userId]).emit("getNotification", {
                    type: `Multiple Users are Waiting To Be Chosen`,
                    description: `Your post titled "${filteredDonations[i].title}" has multiple users waiting to be chosen`
                })
            }
            await prisma.notification.create({
                data: {
                    type: `Multiple Users are Waiting To Be Chosen`,
                    description: `Your post titled "${filteredDonations[i].title}" has multiple users waiting to be chosen`,
                    userId: filteredDonations[i].userId
                }
            })
        }
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

    async areaPost(userId, area, type, description) {
        const oneDay = 24 * 60 * 60 * 1000;
        const now = new Date(Date.now()).getTime();
        for (let i = 0; i < area.users.length; i++) {
            if (area.users[i].id in this.onlineUsers && area.users[i].id !== userId && (now - area.users[i].lastNotificationReceived.getTime() > oneDay)) {
                this.io.to(this.onlineUsers[area.users[i].id]).emit("getNotification", { type, description })
            }
        }
    }
}
module.exports = WebSocketManager;