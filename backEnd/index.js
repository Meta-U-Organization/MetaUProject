
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000; 
app.use(express.json());
app.use(cors());
const userRoutes = require ('./routes/userCRUD');
const requestPostRoutes = require ('./routes/requestPostCRUD');
const donationPostRoutes = require ('./routes/donationPostCRUD');
const session = require('express-session');
app.use(userRoutes);
app.use(requestPostRoutes);
app.use(donationPostRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my app!')
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})