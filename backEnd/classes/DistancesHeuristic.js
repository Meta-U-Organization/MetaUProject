const Heuristic = require("./Heuristic");

class DistancesHeuristic extends Heuristic {
    constructor(distances) {
        super();
        this.distances = distances;
        this.distanceWeight = 40;
    }

    sanitize() {
        this.sanitizedDistances = this.distances.map((distance) => {
            const regex = distance.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/g);
            return parseInt(regex[0].replace(",", ""));
        })
    }
    minMax() {
        this.min = Math.min(...this.sanitizedDistances);
        this.max = Math.max(...this.sanitizedDistances);
        if (this.max > 50 && this.min < 50) {
            this.max = 50;
        }
    }

    normalize() {
        this.normalizedDistances = this.sanitizedDistances.map((dist) => {
            if (dist <= this.max) {
                return (1 - ((dist - this.min) / (this.max - this.min)));
            } else {
                return (this.max / dist) - 1
            }
        })

    }

    score() {
        this.weightedDistances = this.weight();
    }

    getScore() {
        return this.weightedDistances;
    }

    /*chose to use a x^3 function to allow for a diminished effect for 
    those closer to the max distance. so if you are 51 miles away you will 
    only get -0.0001 points. This allows for a more pleasent scaled 
    reduction on score
    */
    weight() {
        return this.normalizedDistances.map((dist) => {
            return Math.pow(dist, 3) * this.distanceWeight;
        })
    }

}
module.exports = DistancesHeuristic;