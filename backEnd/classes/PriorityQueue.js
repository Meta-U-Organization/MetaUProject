
class PriorityQueue {
    constructor() {
        this.notifications = []
    }

    typeSanitization(type) {
        if (type.startsWith("Multiple")) {
            return 1;
        } else if (type.startsWith("New Donation")) {
            return 2;
        } else if (type.startsWith("New Request")) {
            return 3;
        }
    }

    getPriority(notificaiton) {
        const now = new Date(Date.now()).getTime();
        const timeNormalized = 1 - (now - notificaiton.timeCreated.getTime()) / (7 * 24 * 60 * 60 * 1000)
        const timeScaled = Math.pow(timeNormalized, 2);
        const timeWeighted = timeScaled * 50;
        const priority = timeWeighted + notificaiton.typeNum * 10;
        return priority;
    }

    enqueue(notification) {

        let inserted = false;
        notification.typeNum = this.typeSanitization(notification.type);
        notification.priority = this.getPriority(notification);

        for (let i = 0; i < this.notifications.length; i++) {
            if (notification.priority >= this.notifications[i].priority) {
                this.notifications.splice(i, 0, notification);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            this.notifications.push(notification);
        }
    }

    deQueue() {
        if (this.notifications.isEmpty()) {
            return null
        }
        return this.notifications.unshift();
    }

}
module.exports = PriorityQueue;