const Heuristic = require("./Heuristic");

class WantScoreHeurisitic extends Heuristic {
    //within each one we should pass in 
    constructor(wantScores) {
        super();
        this.wantScores = wantScores;
        this.wantScoreWeight = 30;
    }

    sanitize() {
        this.wantScores = this.wantScores;
    }

    minMax() {
        this.min = 0;
        this.max = 5;
    }

    normalize() {
        this.normalizedWantScores = this.wantScores.map((score) => (score - this.min) / this.max)
    }
    //due to the lack of variance I chose to have the score be only linearlly weighted
    weight() {
        return this.normalizedWantScores.map((score) => score * this.wantScoreWeight)
    }

    score() {
        this.weightedWantScores = this.weight();
    }

    getScore() {
        return this.weightedWantScores;
    }
}
module.exports = WantScoreHeurisitic