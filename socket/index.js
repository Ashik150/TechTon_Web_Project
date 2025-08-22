import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer);
//initiatint server
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"]
    }
});