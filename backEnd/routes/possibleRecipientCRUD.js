const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;
const RecipientRecommender = require('./RecipientRecommender')

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
  }

  if (allpossibleRecipients.length > 1) {
    const findRecipients = new RecipientRecommender(allpossibleRecipients);
    findRecipients.minMax();
    findRecipients.normalize();
    findRecipients.score();
    findRecipients.sort();
    res.json(findRecipients.recipients);
  } else {
    res.json(allpossibleRecipients);
  }
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
  const { selectedId, donorId } = req.body;

  const selectedUser = await prisma.user.findUnique({
    where: { id: parseInt(selectedId) },
  });

  const donor = await prisma.user.findUnique({
    where: { id: parseInt(donorId) },
  });


  const updatedDonor = await prisma.user.update({
    where: { id: parseInt(donorId) },
    data: {
      numTimesDonated: donor.numTimesDonated + 1,
    }
  })

  const updatedRecipient = await prisma.user.update({
    where: { id: parseInt(selectedId) },
    data: {
      donationsReceived: selectedUser.donationsReceived + 1,
      lastDonationReceived: new Date(Date.now())
    }
  });
  res.json(updatedRecipient)
})



module.exports = router