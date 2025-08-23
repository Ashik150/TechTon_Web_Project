import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer);
//initiating server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

app.use(cors());
app.use(express.json());

// Health check route.
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Function to add a user
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
//removing a user
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

//getting the user by receiverid
const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};
// Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

//
io.on("connection", (socket) => {
  //when the user is connected
  console.log("a user is connected.");
  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  const messages = {}; // Object to track messages sent to each user

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });

    const user = getUser(receiverId);

    // Store the messages in the `messages` object
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    // send the message to the recevier
    io.to(user?.socketId).emit("getMessage", message);
  });
});
// 
socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
        const user = getUser(senderId);

        // update the seen flag for the message
        if (messages[senderId]) {
            const message = messages[senderId].find(
                (message) =>
                    message.receiverId === receiverId && message.id === messageId
            );
            if (message) {
                message.seen = true;

                // send a message seen event to the sender
                io.to(user?.socketId).emit("messageSeen", {
                    senderId,
                    receiverId,
                    messageId,
                });
            }
        }

    });
