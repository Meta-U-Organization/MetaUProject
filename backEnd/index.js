
const express = require('express')
const app = express()
const PORT = 3000; 
//const projectRoutes = require ('./routes/projectRoutes');
const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my app!')
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})