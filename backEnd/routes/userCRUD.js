const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;
const bcrypt = require('bcrypt')


router.post("/signup", async (req, res) => {
  const { username, password, email, name, phoneNumber, address, preferredMeetTime, preferredMeetLocation } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const existingUser = await prisma.user.findUnique({
    where: { username }
  });

  if (existingUser) {
    return res.status(400).json({ message: "Username already taken." });
  }

  const existingEmail = await prisma.user.findUnique({
    where: { email }
  });

  if (existingEmail) {
    return res.status(400).json({ message: "Email already in use." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      passwordHash,
      email,
      name,
      phoneNumber,
      address,
      preferredMeetTime,
      preferredMeetLocation
    }
  });
  res.json({ message: "Sign Up Succesful!" });
})

router.post("/logout", (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.json({ message: "Logged out successfully" });
  });

});

router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });

  res.json(user);
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      donationPosts: true,
      requestPosts: true,
    }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid Username" });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return res.status(400).json({ message: "Invalid username or password." });
  }
  req.session.userId = user.id;
  res.json({ message: "Login successful!", user });

})

//get all users
router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      donationPosts: true,
      requestPosts: true,
    }
  })
  res.json(users)
})

//get individual users
router.get('/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (req.session.userId == null) {
    return res.status(401).json({ message: "Not Signed In" });
  }
  const individualUser = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      donationPosts: true,
      requestPosts: true,
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
  const { userName, passwordHash, email, name, phoneNumber, address } = req.body;
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