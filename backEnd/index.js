
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const app = express()
const PORT = 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const userRoutes = require('./routes/userCRUD');
const requestPostRoutes = require('./routes/requestPostCRUD');
const donationPostRoutes = require('./routes/donationPostCRUD');
const possibleRecipientRoutes = require('./routes/possibleRecipientCRUD');

app.use(session({
  name: 'sessionId',
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60 * 60 * 100 * 24,
    secure: process.env.RENDER ? true : false,
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,
}));


app.use(userRoutes);
app.use(requestPostRoutes);
app.use(donationPostRoutes);
app.use(possibleRecipientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})