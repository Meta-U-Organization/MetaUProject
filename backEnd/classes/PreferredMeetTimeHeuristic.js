const Heuristic = require("./Heuristic");

class PreferredMeetTimeHeuristic extends Heuristic {
    constructor(recipientPreferredTimes, signedInUserPreferredTime) {
        super();
        this.recipientPreferredTimes = recipientPreferredTimes;
        this.signedInUserPreferredTime = signedInUserPreferredTime;
        this.timeWeight = 15;
    }

    sanitize() {
        if (this.signedInUserPreferredTime === "Morning") {
            this.sanitizedSignedInUserMeetTime = 1;
        } else if (this.signedInUserPreferredTime === "Afternoon") {
            this.sanitizedSignedInUserMeetTime = 2;
        } else if (this.signedInUserPreferredTime === "Evening") {
            this.sanitizedSignedInUserMeetTime = 3;
        }
        this.sanitizedMeetTimes = this.recipientPreferredTimes.map((meetTime) => {
            if (meetTime === "Morning") {
                return 1;
            } else if (meetTime === "Afternoon") {
                return 2;
            } else if (meetTime === "Evening") {
                return 3;
            }
        });
    }

    minMax() {
        this.min = 1;
        this.max = 3;
    }
    normalize() {
        this.normalizedMeetTimes = this.sanitizedMeetTimes.map((time) => (1 - ((Math.abs(this.sanitizedSignedInUserMeetTime - time)) / (this.max - this.min))));
    }
    weight() {
        return this.normalizedMeetTimes.map((time) => time * this.timeWeight)
    }
    score() {
        this.weightedTimes = this.weight()
    }
    getScore() {
        return this.weightedTimes;
    }
}
module.exports = PreferredMeetTimeHeuristic;