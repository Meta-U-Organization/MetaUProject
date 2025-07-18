const Heuristic = require("./Heuristic");

class LastDonationReceivedHeuristic extends Heuristic {
    constructor(LastDonationsReceived) {
        super();
        this.lastDonationsReceived = LastDonationsReceived;
        this.lastDonationReceivedWeight = 10;
    }
    sanitize() {
        this.lastDonationsReceived = this.lastDonationsReceived;
    }
    minMax() {
        this.min = Math.min(...this.lastDonationsReceived);
        this.max = Math.max(...this.lastDonationsReceived);
    }
    normalize() {
        this.normalizedlastDonationsReceived = this.lastDonationsReceived.map((time) => (1 - ((time - this.min) / (this.max - this.min))));
    }
    score() {
        this.weightedLastDonationsReceived = this.weight();
    }

    getScore() {
        return this.weightedLastDonationsReceived;
    }
    /*chose to do a x^2 to diminish people that had received something
    very recently. so if their original normalization was 0.1 then it 
    would turn into 0.01, giving them less points
    */
    weight() {
        return this.normalizedlastDonationsReceived.map((time) => Math.pow(time, 2) * this.lastDonationReceivedWeight);
    }
}
module.exports = LastDonationReceivedHeuristic