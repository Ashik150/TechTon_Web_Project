import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer);
//initiating server
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"]
    }
});

dotenv.config();

app.use(cors());
app.use(express.json());

// Health check route. 
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Function to add a user
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
