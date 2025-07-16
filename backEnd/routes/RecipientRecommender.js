
class RecipientRecommender {

    constructor(recipients) {
        this.recipients = recipients;
        this.numTimesDonatedWeight = 10;
        this.distanceWeight = 40;
        this.donationsReceivedWeight = 10;
        this.lastDonationReceivedWeight = 10;
        this.wantScoreWeight = 30;
    }

    sanitize() {
        for (let i = 0; i < this.recipients.length; i++) {
            const distance = this.recipients[i].Distance.match(/\d{1,3}(?:,\d{3})*(?:\.\d+)?/g);
            this.recipients[i].Distance = distance[0].replace(",", "");
        }
    }


    minMax() {
        this.minDistance = Math.min(...this.recipients.map((recipient) => recipient.Distance));
        this.maxDistance = Math.max(...this.recipients.map((recipient) => recipient.Distance));
        if (this.maxDistance > 50 && this.minDistance < 50) {
            this.maxDistance = 50;
        }
        this.minDonationsReceived = Math.min(...this.recipients.map((recipient) => recipient.donationsReceived));
        this.maxDonationsReceived = Math.max(...this.recipients.map((recipient) => recipient.donationsReceived));
        this.minTimesDonated = Math.min(...this.recipients.map((recipient) => recipient.numTimesDonated));
        this.maxTimesDonated = Math.max(...this.recipients.map((recipient) => recipient.numTimesDonated));
        this.oldestDonationReceived = Math.min(...this.recipients.map((recipient) => recipient.lastDonationReceived));
        this.youngestDonationReceived = Math.max(...this.recipients.map((recipient) => recipient.lastDonationReceived));
    }

    normalize() {
        for (let i = 0; i < this.recipients.length; i++) {
            this.recipients[i].wantScoreNormalize = (this.recipients[i].wantScore / 5);
            if (this.recipients[i].Distance <= this.maxDistance) {
                this.recipients[i].DistanceNormalize = (1 - ((this.recipients[i].Distance - this.minDistance) / (this.maxDistance - this.minDistance)));
            } else {
                this.recipients[i].DistanceNormalize = (this.maxDistance / this.recipients[i].Distance) - 1
            }
            this.recipients[i].donationsReceivedNormalize = (1 - ((this.recipients[i].donationsReceived - this.minDonationsReceived) / (this.maxDonationsReceived - this.minDonationsReceived)));
            this.recipients[i].numTimesDonatedNormalize = (this.recipients[i].numTimesDonated - this.minTimesDonated) / (this.maxTimesDonated - this.minTimesDonated);
            this.recipients[i].lastDonationReceivedNormalize = (1 - ((this.recipients[i].lastDonationReceived - this.youngestDonationReceived) / (this.oldestDonationReceived - this.youngestDonationReceived)));
        }
    }

    score() {
        for (let i = 0; i < this.recipients.length; i++) {
            this.recipients[i].score = 0;
            this.recipients[i].score += this.weightWantScore(i);
            this.recipients[i].score += this.weightDistance(i);
            this.recipients[i].score += this.weightDonationsReceived(i);
            this.recipients[i].score += this.weightNumTimesDonated(i);
            this.recipients[i].score += this.weightLastDonationReceived(i);
        }
    }

    weightWantScore(index) {
        return this.recipients[index].wantScoreNormalize * this.wantScoreWeight;
    }
    weightDistance(index) {
        return Math.pow(this.recipients[index].DistanceNormalize, 3) * this.distanceWeight;
    }

    weightDonationsReceived(index) {
        return Math.pow(this.recipients[index].donationsReceivedNormalize, 2) * this.donationsReceivedWeight;
    }

    weightNumTimesDonated(index) {
        return this.recipients[index].numTimesDonatedNormalize * this.numTimesDonatedWeight;
    }

    weightLastDonationReceived(index) {
        return this.recipients[index].lastDonationReceivedNormalize * this.lastDonationReceivedWeight;
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