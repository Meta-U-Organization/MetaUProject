const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;

const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "You must be logged in to perform this action." });
    }
    next();
};

//get all posts
router.get('/users/:userId/donations', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const allDonations = await prisma.donationPost.findMany({
    where:{
      userId:parseInt(userId)
    },
  });
  res.json(allDonations);
})


//get individual post
router.get('/users/:userId/donations/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId);
  const userId = parseInt(req.params.userId);
  const individualPost = await prisma.donationPost.findUnique({
    where:{
      id:parseInt(postId),
      userId:parseInt(userId)
    },
  });
  res.json(individualPost);
})

//add in a post
router.post('/users/:userId/donations', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const {title, description, photo, itemState} = req.body;
  if(req.session.userId !== userId){
     return res.status(401).json({ message: "Invalid User" });
  }
  const newDonationPost = await prisma.donationPost.create({
    data: {
      title,
      description,
      photo,
      itemState,
      userId
    }
  });
  res.json(newDonationPost);
})

//deletes post
router.delete('/users/:userId/donations/:postId', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  if(req.session.userId !== userId){
     return res.status(401).json({ message: "Invalid User" });
  }
  const deletedpost = await prisma.donationPost.delete({
    where: { 
      id: parseInt(postId),
      userId: parseInt(userId),
     }
  }); 
  res.json(deletedpost);
})

//updates post
router.put('/users/:userId/donations/:postId', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  if(req.session.userId !== userId){
     return res.status(401).json({ message: "Invalid User" });
  }
  const {title, description, photo, itemState} = req.body;
  const updatedPost = await prisma.donationPost.update({
    where: { id: parseInt(postId),
      userId: parseInt(userId),
     },
    data: {
      title,
      description,
      photo,
      itemState,
      userId
    }
  });
  res.json(updatedPost);
})

module.exports = router