const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

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

    socket.emit("newMessage",
    {
        from:"Admin",
        text:"Welcome to the chat app"
    });

    socket.broadcast.emit("newMessage",
    {
        from:"admin",
        text:"New User Joined"
    });
   

    socket.on("createMessage",(message) => 
    {
        console.log(JSON.stringify(message,undefined,2));
        io.emit("newMessage",
        {
            from:message.from,
            text:message.text,
            timestamp:new Date().getTime()
        });
    });

    socket.on("disconnect",() => 
    {
        console.log("User disconnected");
    });
});




server.listen(port,() => 
{
    console.log(`Server is up and running on port ${port}`);
});
