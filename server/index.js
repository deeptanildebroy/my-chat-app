const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://deeptanildebroy.github.io/my-chat-app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected ", socket.id);
  socket.on("join_room", ({ room, username }) => {
    socket.join(room);
    io.to(room).emit("join_user",username);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("leave_room", ({ room,username }) => {
    socket.leave(room);
    io.to(room).emit("remove_user",username);
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT : 3001");
});
