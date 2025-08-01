const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;
const manager = require('../index')


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


//gets all donations and calculates the distance between the user and the post
router.get('/allDonations/:userId', async (req, res) => {
  const donations = await prisma.donationPost.findMany({
    orderBy: {
      id: "desc"
    }
  })

  const userId = parseInt(req.params.userId);
  const signedInUser = await prisma.user.findUnique({
    where: { id: userId }
  });

  const origin = signedInUser.address;
  const api_key = process.env.GOOGLE_API;
  const userDistances = {};
  for (let i = 0; i < donations.length; i++) {
    if (donations[i].userId in userDistances) {
      donations[i].distance = userDistances[donations[i].userId];
    } else {
      const donor = await prisma.user.findUnique({
        where: { id: parseInt(donations[i].userId) }
      })
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${donor.preferredMeetLocation}&units=imperial&key=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.error_message) {
        donations[i].distance = "ERROR";
      } else {
        donations[i].distance = data.rows[0].elements[0].distance?.text;
      }
      userDistances[donations[i].userId] = donations[i].distance;
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
  const { title, description, photo, itemState, type, notificationDescription, areaId } = req.body;
  const newDonationPost = await prisma.donationPost.create({
    data: {
      title,
      description,
      photo,
      itemState,
      userId
    }
  });

  const area = await prisma.area.findUnique({
    where: {
      id: areaId
    },
    include: {
      users: true
    }
  })
  manager.areaPost(userId, area, type, notificationDescription)
  for (let i = 0; i < area.users.length; i++) {
    if (area.users[i].id !== userId) {
      const newNotification = await prisma.notification.create({
        data: {
          type,
          description: notificationDescription,
          userId: area.users[i].id
        }
      })
      const updatedNote = await prisma.user.update({
        where: { id: parseInt(area.users[i].id) },
        data: {
          lastNotificationReceived: new Date(Date.now()),
        }
      })
    }
  }
  res.json(newDonationPost);
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