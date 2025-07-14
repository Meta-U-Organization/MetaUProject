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


  if (allpossibleRecipients.length > 1) {
    res.json(newPossibleRecipient);
    return;
  }

  //to get all values
  let minDistance, maxDistance, minDonationsReceived, maxDonationsReceived,
    minTimesDonated, maxTimesDonated, oldestDonationReceived, youngestDonationReceived;
  for (let i = 0; i < allpossibleRecipients.length; i++) {

    const requester = await prisma.user.findUnique({
      where: { id: parseInt(allpossibleRecipients[i].userId) },
    });

    allpossibleRecipients[i].donationsReceived = requester.donationsReceived;
    allpossibleRecipients[i].lastDonationReceived = requester.lastDonationReceived;
    allpossibleRecipients[i].numTimesDonated = requester.numTimesDonated;

    minDistance = !minDistance || minDistance > allpossibleRecipients[i].Distance ?
      allpossibleRecipients[i].Distance : minDistance;

    maxDistance = !maxDistance || maxDistance < allpossibleRecipients[i].Distance ?
      allpossibleRecipients[i].Distance : maxDistance;

    minDonationsReceived = !minDonationsReceived || minDonationsReceived > allpossibleRecipients[i].donationsReceived ?
      allpossibleRecipients[i].donationsReceived : minDonationsReceived;

    maxDonationsReceived = !maxDonationsReceived || maxDonationsReceived < allpossibleRecipients[i].donationsReceived ?
      allpossibleRecipients[i].donationsReceived : maxDonationsReceived;

    minTimesDonated = !minTimesDonated || minTimesDonated > allpossibleRecipients[i].numTimesDonated ?
      allpossibleRecipients[i].numTimesDonated : minTimesDonated;

    maxTimesDonated = !maxTimesDonated || maxTimesDonated < allpossibleRecipients[i].numTimesDonated ?
      allpossibleRecipients[i].numTimesDonated : maxTimesDonated;

    oldestDonationReceived = !oldestDonationReceived || oldestDonationReceived < allpossibleRecipients[i].lastDonationReceived ?
      allpossibleRecipients[i].lastDonationReceived : oldestDonationReceived;

    youngestDonationReceived = !youngestDonationReceived || youngestDonationReceived > allpossibleRecipients[i].lastDonationReceived ?
      allpossibleRecipients[i].lastDonationReceived : youngestDonationReceived;


  }

  //define mins and maxes

  res.json(allpossibleRecipients);
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



module.exports = router