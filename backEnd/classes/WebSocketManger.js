const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient;
const PriorityQueue = require("./PriorityQueue")

class WebSocketManager {
    constructor(io) {
        this.DAYS_IN_MS = 24 * 60 * 60 * 1000;
        this.REMINDER_THRESHOLD_TIME_MS = 3 * 24 * 60 * 60 * 1000;
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
            now - donation.timeCreated.getTime() > this.REMINDER_THRESHOLD_TIME_MS);
        for (let i = 0; i < filteredDonations.length; i++) {
            if (filteredDonations[i].userId in this.onlineUsers) {
                this.io.to(this.onlineUsers[filteredDonations[i].userId].socketId).emit("getNotification", {
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

    async addNewUser(userId, socketId) {
        const userQueue = new PriorityQueue()
        const now = new Date(Date.now()).getTime();

        const individualUserNotifications = await prisma.notification.findMany({
            where: { userId: parseInt(userId) },
        });
        const lastWeeksNotifications = individualUserNotifications.filter(
            notification => (now - notification.timeCreated.getTime()) < 7 * this.DAYS_IN_MS
        )

        lastWeeksNotifications.sort((a, b) => {
            if (a.timeCreated.getTime() < b.timeCreated.getTime()) {
                return 1;
            } else if (a.timeCreated.getTime() > b.timeCreated.getTime()) {
                return -1;
            }
        })

        const length = lastWeeksNotifications.length > 10 ? 10 : lastWeeksNotifications.length;
        for (let i = 0; i < length; i++) {
            userQueue.enqueue(lastWeeksNotifications[i])
        }

        this.onlineUsers[userId] = { socketId, userQueue };
    }

    deleteUser(userId) {
        if (userId in this.onlineUsers) {
            delete this.onlineUsers[userId];
        }
    }

    requestNotification(userId, type, description) {
        if (userId in this.onlineUsers) {
            this.io.to(this.onlineUsers[userId].socketId).emit("getNotification", { type, description })
        }
    }

    async areaPost(userId, area, type, description) {
        const now = new Date(Date.now()).getTime();
        for (let i = 0; i < area.users.length; i++) {
            if (area.users[i].id in this.onlineUsers && area.users[i].id !== userId && (now - area.users[i].lastNotificationReceived.getTime() > this.DAYS_IN_MS)) {
                this.io.to(this.onlineUsers[area.users[i].id].socketId).emit("getNotification", { type, description })
            }
        }
    }

    getInitialPosts(userId) {
        if (userId in this.onlineUsers) {
            const userQueue = this.onlineUsers[userId].userQueue;
            const initNotifs = []
            while (!userQueue.isEmpty()) {
                initNotifs.push(userQueue.deQueue())
            }
            return initNotifs;
        }
    }
}
module.exports = WebSocketManager;