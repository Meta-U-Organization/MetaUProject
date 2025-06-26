const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient;


router.get('/books', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

module.exports = router