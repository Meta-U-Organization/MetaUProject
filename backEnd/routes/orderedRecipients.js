const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;

class orderedRecipients {

    constructor(recipients) {
        this.recipients = recipients;
    }

    async fetchRelativeInfo() {
        for (let i = 0; i < this.recipients.length; i++) {
            const requester = await prisma.user.findUnique({
                where: { id: parseInt(this.recipients[i].userId) },
            });
            this.recipients[i].username = requester.username;
            this.recipients[i].name = requester.name;
            this.recipients[i].email = requester.email;
            this.recipients[i].phoneNumber = requester.phoneNumber;
            this.recipients[i].donationsReceived = requester.donationsReceived;
            this.recipients[i].lastDonationReceived = requester.lastDonationReceived;
            this.recipients[i].numTimesDonated = requester.numTimesDonated;
        }
    }

}
module.exports = orderedRecipients