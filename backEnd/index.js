
const express = require('express');
const app = express();
const PORT = 3000; 
const userRoutes = require ('./routes/userCRUD');
const requestPostRoutes = require ('./routes/requestPostCRUD');
const donationPostRoutes = require ('./routes/donationPostCRUD');

app.use(express.json());
app.use(userRoutes);
app.use(requestPostRoutes);
app.use(donationPostRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to my app!')
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})