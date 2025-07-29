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
router.get('/users/:userId/requests', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const allRequests = await prisma.requestPost.findMany({
    where: {
      userId: parseInt(userId)
    },
  });
  res.json(allRequests);
})

router.get('/allRequests', async (req, res) => {
  const allRequests = await prisma.requestPost.findMany({
  });
  res.json(allRequests);
})

//get individual post
router.get('/users/:userId/requests/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId);
  const userId = parseInt(req.params.userId);
  const individualPost = await prisma.requestPost.findUnique({
    where: {
      id: parseInt(postId),
      userId: parseInt(userId)
    },
  });
  res.json(individualPost);
})

//add in a post
router.post('/users/:userId/requests', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (req.session.userId !== userId) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const { title, description, itemState } = req.body;
  const newRequestPost = await prisma.requestPost.create({
    data: {
      title,
      description,
      itemState,
      userId
    }
  });
  res.json(newRequestPost);
})

//deletes post
router.delete('/users/:userId/requests/:postId', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  if (req.session.userId !== userId) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const deletedpost = await prisma.requestPost.delete({
    where: {
      id: parseInt(postId),
      userId: parseInt(userId),
    }
  });
  res.json(deletedpost);
})

//updates post
router.put('/users/:userId/requests/:postId', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  if (req.session.userId !== userId) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const { title, description, itemState } = req.body;
  const updatedPost = await prisma.requestPost.update({
    where: {
      id: parseInt(postId),
      userId: parseInt(userId),
    },
    data: {
      title,
      description,
      itemState,
      userId
    }
  });
  res.json(updatedPost);
})

module.exports = router