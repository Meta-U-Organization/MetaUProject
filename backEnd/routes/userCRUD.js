const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;
const bcrypt = require('bcrypt')


router.post("/signup", async (req, res) => {
  const { username, password, email, name, phoneNumber, address} = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const existingUser = await prisma.user.findUnique({
    where: { username }
  });

  if (existingUser) {
      return res.status(400).json({ error: "Username already taken." });
  }

  const bcrypt = require("bcrypt");
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      passwordHash,
      email,
      name,
      phoneNumber,
      address
    }
  });
  res.json(newUser);
})

router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }
  
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
    select: { username: true } // Only return necessary data
  });

  res.json({ id: req.session.userId, username: user.username });
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ message: "Username and password are required." });
  }

  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    res.json({ message: "Invalid Username" });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    res.json({ message: "Invalid username or password." });
  }
  req.session.userId = user.id;
  res.json({ message: "Login successful!" });

})

//get all users
router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
        donationPosts:true,
        requestPosts:true,
    }})
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

//deletes user
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
  const { userName, passwordHash, email, name, phoneNumber, address} = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      userName,
      passwordHash,
      email,
      name,
      phoneNumber,
      address
    }
  });
  res.json(updatedUser);
})

module.exports = router