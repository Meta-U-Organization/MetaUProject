const DistancesHeuristic = require("./DistancesHeuristic");
const DonationsReceivedHeuristic = require("./DonationsReceivedHeuristic");
const LastDonationReceivedHeuristic = require("./LastDonationReceivedHeuristic");
const NumTimesDonatedHeurisitic = require("./NumTimesDonatedHeuristic");
const PreferredMeetTimeHeuristic = require("./PreferredMeetTimeHeuristic");
const WantScoreHeurisitic = require("./WantScoreHeuristic");

class RecipientRecommender {

    constructor(recipients, signedInUserPreferredMeetTime) {
        this.recipients = recipients;
        this.preferredMeetTimeObject = new PreferredMeetTimeHeuristic(this.recipients.map((recipient) => recipient.preferredMeetTime), signedInUserPreferredMeetTime.preferredMeetTime);
        this.wantScoresObject = new WantScoreHeurisitic(this.recipients.map((recipient) => recipient.wantScore));
        this.numTimesDonatedObject = new NumTimesDonatedHeurisitic(this.recipients.map((recipient) => recipient.numTimesDonated));
        this.lastDonationReceivedObject = new LastDonationReceivedHeuristic(this.recipients.map((recipient) => recipient.lastDonationReceived));
        this.distancesObject = new DistancesHeuristic(this.recipients.map((recipient) => recipient.Distance));
        this.donationsReceivedObject = new DonationsReceivedHeuristic(this.recipients.map((recipient) => recipient.donationsReceived))
    }

    sanitize() {
        this.preferredMeetTimeObject.sanitize();
        this.wantScoresObject.sanitize();
        this.numTimesDonatedObject.sanitize();
        this.lastDonationReceivedObject.sanitize();
        this.distancesObject.sanitize();
        this.donationsReceivedObject.sanitize();
    }


    minMax() {
        this.preferredMeetTimeObject.minMax();
        this.wantScoresObject.minMax();
        this.numTimesDonatedObject.minMax();
        this.lastDonationReceivedObject.minMax();
        this.distancesObject.minMax();
        this.donationsReceivedObject.minMax();
    }

    normalize() {
        this.preferredMeetTimeObject.normalize();
        this.wantScoresObject.normalize();
        this.numTimesDonatedObject.normalize();
        this.lastDonationReceivedObject.normalize();
        this.distancesObject.normalize();
        this.donationsReceivedObject.normalize();
    }

    score() {
        this.preferredMeetTimeObject.score();
        this.wantScoresObject.score();
        this.numTimesDonatedObject.score();
        this.lastDonationReceivedObject.score();
        this.distancesObject.score();
        this.donationsReceivedObject.score();
    }

    aggregateScores() {
        this.timeScores = this.preferredMeetTimeObject.getScore()
        this.wantScores = this.wantScoresObject.getScore();
        this.timesDonatedScores = this.numTimesDonatedObject.getScore();
        this.lastDonationScores = this.lastDonationReceivedObject.getScore();
        this.distancesScores = this.distancesObject.getScore();
        this.donationsReceivedScores = this.donationsReceivedObject.getScore();
        for (let i = 0; i < this.recipients.length; i++) {
            this.recipients[i].score = 0;
            this.recipients[i].score += this.timeScores[i];
            this.recipients[i].score += this.wantScores[i]
            this.recipients[i].score += this.timesDonatedScores[i]
            this.recipients[i].score += this.lastDonationScores[i]
            this.recipients[i].score += this.distancesScores[i]
            this.recipients[i].score += this.donationsReceivedScores[i]
        }
    }

    sort() {
        this.recipients.sort((rec1, rec2) => {
            if (rec1.score > rec2.score) {
                return -1;
            } else {
                return 1;
            }
        })
    }

}
module.exports = RecipientRecommender