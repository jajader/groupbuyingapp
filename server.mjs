import {createServer} from "node:http";
import next from "next";
import {Server} from "socket.io";

const dev = true;
const hostname  = "localhost";
const port = 3000;

const app = next({dev, hostname, port});
const handle = app.getRequestHandler();

app.prepare().then(() => {
   const httpServer = createServer(handle);
   const io = new Server(httpServer);
   io.on("connection", socket => {
       console.log(`User connected: ${socket.id}`);
       socket.on("join-room", ({room, username}) => {
           socket.join(room);
           console.log(`User joined: ${username} joined room ${room}`);
           socket.to(room).emit("user_joined", `${username} joined room ${room}`);
       })

       socket.on("message", ({room, message, sender}) => {
           console.log(`${sender} received ${message}, ${room}`);
           socket.to(room).emit("message", {sender, message})
       })

       socket.on("disconnect", () => {
           console.log(`User disconnected: ${socket.id}`);
       })
   })

    httpServer.listen(port, () => {
        console.log(`Server running on port: http://${hostname}:${port}`);
    });
});