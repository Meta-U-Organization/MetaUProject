
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
        this.maxDistance = this.recipients[0].Distance > 50 ? 50 : this.recipients[0].Distance;
        this.minDonationsReceived = this.recipients[0].donationsReceived;
        this.maxDonationsReceived = this.recipients[0].donationsReceived;
        this.minTimesDonated = this.recipients[0].numTimesDonated;
        this.maxTimesDonated = this.recipients[0].numTimesDonated;
        this.oldestDonationReceived = this.recipients[0].lastDonationReceived;
        this.youngestDonationReceived = this.recipients[0].lastDonationReceived;

        for (let i = 1; i < this.recipients.length; i++) {
            //if distance is more than 30 miles away we will want to set max distance as 30
            this.minDistance = this.minDistance > this.recipients[i].Distance ?
                this.recipients[i].Distance : this.minDistance;

            if (this.maxDistance < this.recipients[i].Distance) {
                if (this.recipients[i].Distance > 50) {
                    this.maxDistance = 50;
                } else {
                    this.maxDistance = this.recipients[i].Distance;
                }
            }

            this.minDonationsReceived = this.minDonationsReceived > this.recipients[i].donationsReceived ?
                this.recipients[i].donationsReceived : this.minDonationsReceived;

            this.maxDonationsReceived = this.maxDonationsReceived < this.recipients[i].donationsReceived ?
                this.recipients[i].donationsReceived : this.maxDonationsReceived;

            this.minTimesDonated = this.minTimesDonated > this.recipients[i].numTimesDonated ?
                this.recipients[i].numTimesDonated : this.minTimesDonated;

            this.maxTimesDonated = this.maxTimesDonated < this.recipients[i].numTimesDonated ?
                this.recipients[i].numTimesDonated : this.maxTimesDonated;

            this.oldestDonationReceived = this.oldestDonationReceived < this.recipients[i].lastDonationReceived ?
                this.recipients[i].lastDonationReceived : this.oldestDonationReceived;

            this.youngestDonationReceived = this.youngestDonationReceived > this.recipients[i].lastDonationReceived ?
                this.recipients[i].lastDonationReceived : this.youngestDonationReceived;
        }
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