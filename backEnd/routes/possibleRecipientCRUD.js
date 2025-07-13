const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;

router.get('/users/:userId/donations/:postId/possibleRecipients', async (req, res) => {
  const postId = parseInt(req.params.postId);
  const allpossibleRecipients = await prisma.possibleRecipients.findMany({
    
  });
  res.json(allpossibleRecipients);
})

router.post('/users/:userId/donations/:postId/possibleRecipients', async (req, res) => {
  const donationPostId = parseInt(req.params.postId);
  const userId = parseInt(req.params.userId);
  const {Distance, wantScore} = req.body;
  const newPossibleRecipient = await prisma.possibleRecipients.create({
    data : {
        userId,
        Distance,
        wantScore,
        donationPostId,
    }
  })
  res.json(newPossibleRecipient);
})

module.exports = router