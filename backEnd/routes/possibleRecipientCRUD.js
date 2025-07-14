const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;

router.get('/users/:userId/donations/:postId/possibleRecipients', async (req, res) => {
  const postId = parseInt(req.params.postId);
  const allpossibleRecipients = await prisma.possibleRecipients.findMany({
    where: {
      donationPostId: postId
    }
  });
  res.json(allpossibleRecipients);
})

router.get('/users/:userId/donations/:postId/orderedRecipients', async (req, res) => {
  const postId = parseInt(req.params.postId);
  const allpossibleRecipients = await prisma.possibleRecipients.findMany({
    where: {
      donationPostId: postId
    }
  });


  //to get all values
  let minDistance, maxDistance, minDonationsReceived, maxDonationsReceived,
    minTimesDonated, maxTimesDonated, oldestDonationReceived, youngestDonationReceived;
  for (let i = 0; i < allpossibleRecipients.length; i++) {

    const requester = await prisma.user.findUnique({
      where: { id: parseInt(allpossibleRecipients[i].userId) },
    });
    allpossibleRecipients[i].username = requester.username;
    allpossibleRecipients[i].name = requester.name;
    allpossibleRecipients[i].email = requester.email;
    allpossibleRecipients[i].phoneNumber = requester.phoneNumber;
    allpossibleRecipients[i].donationsReceived = requester.donationsReceived;
    allpossibleRecipients[i].lastDonationReceived = requester.lastDonationReceived;
    allpossibleRecipients[i].numTimesDonated = requester.numTimesDonated;
    minDistance = minDistance === undefined || minDistance > allpossibleRecipients[i].Distance ?
      allpossibleRecipients[i].Distance : minDistance;

    maxDistance = maxDistance === undefined || maxDistance < allpossibleRecipients[i].Distance ?
      allpossibleRecipients[i].Distance : maxDistance;

    minDonationsReceived = minDonationsReceived === undefined || minDonationsReceived > allpossibleRecipients[i].donationsReceived ?
      allpossibleRecipients[i].donationsReceived : minDonationsReceived;

    maxDonationsReceived = maxDonationsReceived === undefined || maxDonationsReceived < allpossibleRecipients[i].donationsReceived ?
      allpossibleRecipients[i].donationsReceived : maxDonationsReceived;

    minTimesDonated = minTimesDonated === undefined || minTimesDonated > allpossibleRecipients[i].numTimesDonated ?
      allpossibleRecipients[i].numTimesDonated : minTimesDonated;

    maxTimesDonated = maxTimesDonated === undefined || maxTimesDonated < allpossibleRecipients[i].numTimesDonated ?
      allpossibleRecipients[i].numTimesDonated : maxTimesDonated;

    oldestDonationReceived = oldestDonationReceived === undefined || oldestDonationReceived < allpossibleRecipients[i].lastDonationReceived ?
      allpossibleRecipients[i].lastDonationReceived : oldestDonationReceived;

    youngestDonationReceived = youngestDonationReceived === undefined || youngestDonationReceived > allpossibleRecipients[i].lastDonationReceived ?
      allpossibleRecipients[i].lastDonationReceived : youngestDonationReceived;

  }

  const numTimesDonatedWeight = 10;
  const distanceWeight = 40;
  const donationsReceivedWeight = 10;
  const lastDonationReceivedWeight = 20;
  const wantScoreWeight = 30;

  for (let i = 0; i < allpossibleRecipients.length; i++) {
    allpossibleRecipients[i].wantScorePoints = (allpossibleRecipients[i].wantScore / 5) * wantScoreWeight;
    allpossibleRecipients[i].DistancePoints = (1 - ((allpossibleRecipients[i].Distance - minDistance) / (maxDistance - minDistance))) * distanceWeight;
    allpossibleRecipients[i].donationsReceivedPoints = (1 - ((allpossibleRecipients[i].donationsReceived - minDonationsReceived) / (maxDonationsReceived - minDonationsReceived))) * donationsReceivedWeight;
    allpossibleRecipients[i].numTimesDonatedPoints = (allpossibleRecipients[i].numTimesDonated - minTimesDonated) / (maxTimesDonated - minTimesDonated) * numTimesDonatedWeight;
    allpossibleRecipients[i].lastDonationReceivedPoints = (1 - ((allpossibleRecipients[i].lastDonationReceived - youngestDonationReceived) / (oldestDonationReceived - youngestDonationReceived))) * lastDonationReceivedWeight;
    allpossibleRecipients[i].score = allpossibleRecipients[i].lastDonationReceivedPoints + allpossibleRecipients[i].numTimesDonatedPoints + allpossibleRecipients[i].donationsReceivedPoints + allpossibleRecipients[i].DistancePoints + allpossibleRecipients[i].wantScorePoints;
  }

  allpossibleRecipients.sort((rec1, rec2) => {
    if (rec1.score > rec2.score) {
      return -1;
    } else {
      return 1;
    }
  })

  const orderedRecipients = allpossibleRecipients;
  res.json(orderedRecipients);
})

router.post('/users/:userId/donations/:postId/possibleRecipients', async (req, res) => {
  const donationPostId = parseInt(req.params.postId);
  const userId = parseInt(req.params.userId);
  const { Distance, wantScore } = req.body;
  const newPossibleRecipient = await prisma.possibleRecipients.create({
    data: {
      userId,
      Distance,
      wantScore,
      donationPostId,
    }
  })
  res.json(newPossibleRecipient);
})

router.post('/selectRecipient', async (req, res) => {
  //will set users donations received + 1 and last donation received
  const { selectedId} = req.body;

  const selectedUser = await prisma.user.findUnique({
    where:{id:parseInt(selectedId)},
  });

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(selectedId) },
    data: {
      donationsReceived: selectedUser.donationsReceived+1,
      lastDonationReceived: new Date(Date.now())
    }
  });
  res.json(updatedUser)
  //will delete the post
})



module.exports = router