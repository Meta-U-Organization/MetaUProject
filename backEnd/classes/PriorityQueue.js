
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

    getPriority(timeCreated, typeNum) {
        let oldestTime;
        if (this.isEmpty()) {
            oldestTime = new Date(Date.now()).getTime();
        } else {
            oldestTime = this.notifications[this.notifications.length - 1].timeCreated
        }
        const scaledTime = 1 - ((timeCreated - oldestTime) / timeCreated)
        const weightedTime = scaledTime * 50
        const priority = weightedTime + typeNum * 10;
        return priority;
    }

    enqueue(type, description, timeCreated) {

        let inserted = false;
        const typeNum = this.typeSanitization(type);
        const priority = this.getPriority(timeCreated, typeNum);

        for (let i = 0; i < this.notifications.length; i++) {
            if (priority >= this.notifications[i].priority) {
                this.notifications.splice(i, 0, { type, description, timeCreated, typeNum, priority });
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            this.notifications.push({ type, description, timeCreated, typeNum, priority });
        }
    }

    deQueue() {
        if (this.isEmpty()) {
            return null
        }
        return this.notifications.shift();
    }

    isEmpty() {
        return this.notifications.length === 0;
    }

}
module.exports = PriorityQueue;