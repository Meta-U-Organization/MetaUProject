const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;
const orderedRecipientsClass = require('./orderedRecipients')

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

  const findRecipients = new orderedRecipientsClass(allpossibleRecipients);
  await findRecipients.fetchRelativeInfo();
  await findRecipients.minMax();
  await findRecipients.normalize();
  await findRecipients.score();
  await findRecipients.sort();

  const retRecipients = findRecipients.recipients;
  res.json(retRecipients);
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