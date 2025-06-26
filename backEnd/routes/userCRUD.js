const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;

//get all users
router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

//get individual users
router.get('/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const individualUser = await prisma.user.findUnique({
    where:{id:parseInt(userId)},
    include: {
        donationPosts:true,
        requestPosts:true,
    }
  });
  res.json(individualUser);
})

//post a user to the database
router.post('/users', async (req, res) => {
  const { userName, passwordHash, email, name, phoneNumber} = req.body;
  const newUser = await prisma.user.create({
    data: {
      userName,
      passwordHash,
      email,
      name,
      phoneNumber
    }
  });
  res.json(newUser);
})

//deletes board
router.delete('/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(userId) }
  }); 
  res.json(deletedUser);
})

//updates User
router.put('/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { userName, passwordHash, email, name, phoneNumber} = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      userName,
      passwordHash,
      email,
      name,
      phoneNumber
    }
  });
  res.json(updatedUser);
})

module.exports = router