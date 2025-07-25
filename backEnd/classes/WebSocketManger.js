const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient;
const PriorityQueue = require("./PriorityQueue")

class WebSocketManager {
    constructor(io) {
        this.DAY_IN_MS = 24 * 60 * 60 * 1000;
        this.FIVE_MINUTES = 5 * 60 * 1000
        this.REMINDER_THRESHOLD_TIME_MS = 3 * this.DAY_IN_MS;
        this.onlineUsers = {};
        this.io = io
        this.intervalPushNotifications = setInterval(() => this.setNewNotifications(), this.FIVE_MINUTES)
        this.intervalReminder = setInterval(() => this.setRecurringReminderNotification(), this.DAY_IN_MS)
    }

    async setNewNotifications() {
        const values = Object.values(this.onlineUsers);
        const keys = Object.keys(this.onlineUsers);
        for (let i = 0; i < values.length; i++) {
            const newNotification = values[i].userQueue.deQueue();
            if (newNotification) {
                const type = newNotification.type;
                const description = newNotification.description;
                this.io.to(values[i].socketId).emit("getNotification", { type, description })
                const newNotificationInBackend = await prisma.notification.create({
                    data: {
                        type,
                        description,
                        userId: parseInt(keys[i])
                    }
                })
            }
        }
    }

    async setRecurringReminderNotification() {
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
                const timeCreated = new Date(Date.now()).getTime();
                const type = `Multiple Users are Waiting To Be Chosen`;
                const description = `Your post titled "${filteredDonations[i].title}" has multiple users waiting to be chosen`;
                this.onlineUsers[filteredDonations[i].userId].userQueue.enqueue(type, description, timeCreated)
            }
        }
    }

    addNewUser(userId, socketId) {
        const userQueue = new PriorityQueue()
        this.onlineUsers[userId] = { socketId, userQueue };
    }

    deleteUser(userId) {
        if (userId in this.onlineUsers) {
            delete this.onlineUsers[userId];
        }
    }

    requestNotification(userId, type, description) {
        const timeCreated = new Date(Date.now()).getTime();
        if (userId in this.onlineUsers) {
            this.onlineUsers[userId].userQueue.enqueue(type, description, timeCreated)
        }
    }

    async areaPost(userId, area, type, description) {
        const timeCreated = new Date(Date.now()).getTime();
        for (let i = 0; i < area.users.length; i++) {
            if (area.users[i].id in this.onlineUsers && area.users[i].id !== userId && (timeCreated - area.users[i].lastNotificationReceived.getTime() > this.DAY_IN_MS)) {
                this.onlineUsers[area.users[i].id].userQueue.enqueue(type, description, timeCreated)
            }
        }
    }
}
module.exports = WebSocketManager;