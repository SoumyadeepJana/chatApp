const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

var {generateMessage,generateLocationMessage} = require("./utils/message.js")

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,"../public");

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

/*io.on("connection",(socket) => 
{
    console.log("New user connnected");

    socket.emit("newEmail",
    {
        from:"sumitjna23@gmail.com",
        text:"call me ASAP",
        timestamp:"12:50"
    });

    socket.on("createEmail",(email) => 
    {
        console.log(JSON.stringify(email,undefined,2));
    });

    socket.on("disconnect",() => 
    {
       console.log("User disconnected");
    });
});*/

io.on("connect",(socket) => 
{
    console.log("New user connected");

    socket.emit("newMessage",generateMessage("Admin","Welcome to chat app"));

    socket.broadcast.emit("newMessage",generateMessage("Admin","New user joined"));
   

    socket.on("createMessage",(message,callback) => 
    {
        console.log(JSON.stringify(message,undefined,2));
        io.emit("newMessage",generateMessage(message.from,message.text));
        callback();
    });

    socket.on("createLocationMessage", (coords) => 
    {
        io.emit("newLocationMessage",generateLocationMessage("User",coords.latitude,coords.longitude));
    });

    socket.on("disconnect",() => 
    {
        console.log("User disconnected");
        socket.broadcast.emit("newMessage",generateMessage("Admin","User left the chat"));
    });
});




server.listen(port,() => 
{
    console.log(`Server is up and running on port ${port}`);
});
