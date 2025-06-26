const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;


//get individual post
router.get('/users/:userId/requests/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId);
  const userId = parseInt(req.params.userId);
  const individualPost = await prisma.requestPost.findUnique({
    where:{
      id:parseInt(postId),
      userId:parseInt(userId)
    },
  });
  res.json(individualPost);
})

//add in a post
router.post('/users/:userId/requests', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const {title, description, photo, useState} = req.body;
  const newRequestPost = await prisma.requestPost.create({
    data: {
      title,
      description,
      photo,
      useState,
      userId
    }
  });
  res.json(newRequestPost);
})

//deletes post
router.delete('/users/:userId/requests/:postId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  const deletedpost = await prisma.requestPost.delete({
    where: { id: parseInt(postId),
      userId: parseInt(userId),
     }
  }); 
  res.json(deletedpost);
})

//updates post
router.put('/users/:userId/requests/:postId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  const {title, description, photo, useState} = req.body;
  const updatedPost = await prisma.requestPost.update({
    where: { id: parseInt(postId),
      userId: parseInt(userId),
     },
    data: {
      title,
      description,
      photo,
      useState,
      userId
    }
  });
  res.json(updatedPost);
})

module.exports = router