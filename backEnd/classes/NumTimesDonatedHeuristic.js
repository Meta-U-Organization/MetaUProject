const Heuristic = require("./Heuristic");

class NumTimesDonatedHeurisitic extends Heuristic {
    constructor(numTimesDonated) {
        super();
        this.numTimesDonated = numTimesDonated;
        this.numTimesDonatedWeight = 10;
    }

    sanitize() {
        this.numTimesDonated = this.numTimesDonated;
    }

    minMax() {
        this.min = Math.min(...this.numTimesDonated);
        this.max = Math.max(...this.numTimesDonated);
    }

    normalize() {
        this.normalizedTimesDonated = this.numTimesDonated.map((num) => (num - this.min) / (this.max - this.min))
    }

    score() {
        this.weightedTimesDonated = this.weight();
    }
    getScore() {
        return this.weightedTimesDonated;
    }

    /*I chose to do a linear weighting since there would not be a lot of change in the numTimes Donated */
    weight() {
        return this.normalizedTimesDonated.map((num) => num * this.numTimesDonatedWeight)
    }
}
module.exports = NumTimesDonatedHeurisitic;