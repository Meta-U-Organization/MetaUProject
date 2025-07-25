
const express = require('express');
const session = require('express-session');
const http = require("http");
const cors = require('cors')
const PORT = 3000;
const app = express()
const WebSocketManager = require('./classes/WebSocketManger');
const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
const manager = new WebSocketManager(io);
module.exports = manager;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

io.on('connection', (socket) => {
  socket.on("newUser", (userId) => {
    const socketId = socket.id;
    manager.addNewUser(userId, socketId);
  })
});

server.listen(3000)

const userRoutes = require('./routes/userCRUD');
const requestPostRoutes = require('./routes/requestPostCRUD');
const donationPostRoutes = require('./routes/donationPostCRUD');
const possibleRecipientRoutes = require('./routes/possibleRecipientCRUD');

app.use(session({
  name: 'sessionId',
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60 * 60 * 1000 * 24,
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

