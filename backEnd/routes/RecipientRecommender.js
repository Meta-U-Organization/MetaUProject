
class RecipientRecommender {

    constructor(recipients) {
        this.recipients = recipients;
        this.numTimesDonatedWeight = 10;
        this.distanceWeight = 40;
        this.donationsReceivedWeight = 10;
        this.lastDonationReceivedWeight = 10;
        this.wantScoreWeight = 30;
    }

    minMax() {
        this.minDistance = this.recipients[0].Distance;
        this.maxDistance = this.recipients[0].Distance;
        this.minDonationsReceived = this.recipients[0].donationsReceived;
        this.maxDonationsReceived = this.recipients[0].donationsReceived;
        this.minTimesDonated = this.recipients[0].numTimesDonated;
        this.maxTimesDonated = this.recipients[0].numTimesDonated;
        this.oldestDonationReceived = this.recipients[0].lastDonationReceived;
        this.youngestDonationReceived = this.recipients[0].lastDonationReceived;

        for (let i = 0; i < this.recipients.length; i++) {

            this.minDistance = this.minDistance === undefined || this.minDistance > this.recipients[i].Distance ?
                this.recipients[i].Distance : this.minDistance;


            this.maxDistance = this.maxDistance === undefined || this.maxDistance < this.recipients[i].Distance ?
                this.recipients[i].Distance : this.maxDistance;

            this.minDonationsReceived = this.minDonationsReceived === undefined || this.minDonationsReceived > this.recipients[i].donationsReceived ?
                this.recipients[i].donationsReceived : this.minDonationsReceived;

            this.maxDonationsReceived = this.maxDonationsReceived === undefined || this.maxDonationsReceived < this.recipients[i].donationsReceived ?
                this.recipients[i].donationsReceived : this.maxDonationsReceived;

            this.minTimesDonated = this.minTimesDonated === undefined || this.minTimesDonated > this.recipients[i].numTimesDonated ?
                this.recipients[i].numTimesDonated : this.minTimesDonated;

            this.maxTimesDonated = this.maxTimesDonated === undefined || this.maxTimesDonated < this.recipients[i].numTimesDonated ?
                this.recipients[i].numTimesDonated : this.maxTimesDonated;

            this.oldestDonationReceived = this.oldestDonationReceived === undefined || this.oldestDonationReceived < this.recipients[i].lastDonationReceived ?
                this.recipients[i].lastDonationReceived : this.oldestDonationReceived;

            this.youngestDonationReceived = this.youngestDonationReceived === undefined || this.youngestDonationReceived > this.recipients[i].lastDonationReceived ?
                this.recipients[i].lastDonationReceived : this.youngestDonationReceived;

        }
    }

    normalize() {
        for (let i = 0; i < this.recipients.length; i++) {
            this.recipients[i].wantScoreNormalize = (this.recipients[i].wantScore / 5);
            this.recipients[i].DistanceNormalize = (1 - ((this.recipients[i].Distance - this.minDistance) / (this.maxDistance - this.minDistance)));
            this.recipients[i].donationsReceivedNormalize = (1 - ((this.recipients[i].donationsReceived - this.minDonationsReceived) / (this.maxDonationsReceived - this.minDonationsReceived)));
            this.recipients[i].numTimesDonatedNormalize = (this.recipients[i].numTimesDonated - this.minTimesDonated) / (this.maxTimesDonated - this.minTimesDonated);
            this.recipients[i].lastDonationReceivedNormalize = (1 - ((this.recipients[i].lastDonationReceived - this.youngestDonationReceived) / (this.oldestDonationReceived - this.youngestDonationReceived)));
        }
    }

    score() {
        for (let i = 0; i < this.recipients.length; i++) {
            this.recipients[i].wantScorePoints = this.weightWantScore(i);
            this.recipients[i].DistancePoints = this.weightDistance(i);
            this.recipients[i].donationsReceivedPoints = this.weightDonationsReceived(i);
            this.recipients[i].numTimesDonatedPoints = this.weightNumTimesDonated(i);
            this.recipients[i].lastDonationReceivedPoints = this.weightLastDonationReceived(i);
            this.recipients[i].score = this.recipients[i].wantScorePoints + this.recipients[i].DistancePoints + this.recipients[i].donationsReceivedPoints + this.recipients[i].numTimesDonatedPoints + this.recipients[i].lastDonationReceivedPoints
        }
    }

    weightWantScore(index) {
        return this.recipients[index].wantScoreNormalize * this.wantScoreWeight;
    }

    weightDistance(index) {
        return this.recipients[index].DistanceNormalize * this.distanceWeight;
    }

    weightDonationsReceived(index) {
        return this.recipients[index].donationsReceivedNormalize * this.donationsReceivedWeight;
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