class Heuristic {
    constructor() {
        if (this.constructor === Heuristic) {
            throw new Error("Cannot instantiate a Heuristic")
        }
    }

    sanitize() {
        throw new Error("Sanitize must be initiated")
    }

    minMax() {
        throw new Error("MinMax must be initiated")
    }

    normalize() {
        throw new Error("Normalize must be initiated")

    }

    score() {
        throw new Error("Score must be initiated")
    }

    weight() {
        throw new Error("weight must be initiated")
    }
}
module.exports = Heuristic