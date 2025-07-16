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
    where: {
      userId: parseInt(userId)
    },
  });
  res.json(allDonations);
})


//get individual post
router.get('/users/:userId/donations/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId);
  const userId = parseInt(req.params.userId);
  const individualPost = await prisma.donationPost.findUnique({
    where: {
      id: parseInt(postId),
      userId: parseInt(userId)
    },
    include: {
      possibleRecipients: true
    }
  });
  res.json(individualPost);
})


//get all users
router.get('/allDonations/:userId', async (req, res) => {
  const donations = await prisma.donationPost.findMany({})
  const userId = parseInt(req.params.userId);
  let donor;
  const signedInUser = await prisma.user.findUnique({
    where: { id: parseInt(userId) }
  });
  const origin = signedInUser.address;

  for (let i = 0; i < donations.length; i++) {
    donor = await prisma.user.findUnique({
      where: { id: parseInt(donations[i].userId) }
    })
    const api_key = process.env.GOOGLE_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${donor.preferredMeetLocation}&units=imperial&key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.rows[0].elements[0].distance?.text == undefined) {
      donations[i].distance = "ERROR";
    } else {
      donations[i].distance = data.rows[0].elements[0].distance?.text;
    }
  }


  res.json(donations)
})


//add in a post
router.post('/users/:userId/donations', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (req.session.userId !== userId) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const { title, description, photo, itemState } = req.body;
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

router.post('/distance', async (req, res) => {
  const { origin, destination } = req.body;
  const api_key = process.env.GOOGLE_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=${api_key}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.rows[0].elements[0].distance?.text == undefined) {
    return res.status(401).json({ message: "Error" });
  }
  res.json(data)
})

//deletes post
router.delete('/users/:userId/donations/:postId', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  if (req.session.userId !== userId) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const deletedpost = await prisma.donationPost.delete({
    where: {
      id: parseInt(postId),
      userId: parseInt(userId),
    },
    include: {
      possibleRecipients: true
    }
  });

  for (let i = 0; i < deletedpost.possibleRecipients.length; i++) {
    const recId = deletedpost.possibleRecipients[i].id;
    const deletedRecipient = await prisma.possibleRecipients.delete({
      where: {
        id: recId
      }
    })
  }

  res.json(deletedpost);
})

//updates post
router.put('/users/:userId/donations/:postId', isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  if (req.session.userId !== userId) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const { title, description, photo, itemState } = req.body;
  const updatedPost = await prisma.donationPost.update({
    where: {
      id: parseInt(postId),
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