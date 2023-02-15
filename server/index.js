const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("nextPageClicked", (room) => {
        console.log(room, socket.id);

        // emits to all clients in room
        io.in(room).emit("nextPageReady", socket.id);
    });

    socket.on("joinRoom", (data) => {
        socket.join(data);
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
