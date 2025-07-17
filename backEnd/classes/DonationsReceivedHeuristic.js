const Heuristic = require("./Heuristic");

class DonationsReceivedHeuristic extends Heuristic {
    constructor(donations) {
        super();
        this.donations = donations;
        this.donationWeight = 10;
    }
    sanitize() {
        this.donations = this.donations;
    }
    minMax() {
        this.min = Math.min(...this.donations);
        this.max = Math.max(...this.donations);
    }
    normalize() {
        if (this.min === 0 && this.max === 0) {
            this.normalizedDonations = this.donations.map((dist) => 0)
        } else {
            this.normalizedDonations = this.donations.map((dist) => (1 - ((dist - this.min) / (this.max - this.min))))
        }
    }
    score() {
        this.weightedDonations = this.weight()
    }
    /*
    I chose to use a x function for the weighting since there would not be
    that much variance in the donations the user has received
    */
    weight() {
        return this.normalizedDonations.map((dist) => dist * this.donationWeight)
    }
    getScore() {
        return this.weightedDonations;
    }
}
module.exports = DonationsReceivedHeuristic;