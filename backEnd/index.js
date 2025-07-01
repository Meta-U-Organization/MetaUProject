
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const app = express()
const PORT = 3000; 
app.use(express.json());
app.use(cors());
const userRoutes = require ('./routes/userCRUD');
const requestPostRoutes = require ('./routes/requestPostCRUD');
const donationPostRoutes = require ('./routes/donationPostCRUD');

app.use (session({
  name: 'sessionId',
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: process.env.RENDER ? true : false,
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,
}));

app.use(userRoutes);
app.use(requestPostRoutes);
app.use(donationPostRoutes);

app.use((err, req, res, next) => {
  const { message, status = 500 } = err
  console.log(message)
  res.status(status).json({ message: '☠️ ' + message })
})

app.get('/', (req, res) => {
  res.send('Welcome to my app!')
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})