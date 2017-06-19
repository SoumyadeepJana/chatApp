const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

var {generateMessage,generateLocationMessage} = require("./utils/message.js")
var {isRealString} = require("./utils/validate.js");
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,"../public");
var {Users} = require("./utils/users.js");

var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));

/*io.on("connection",(socket) => 
{
    console.log("New user connnected");
    console.log(${h1]})
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
      socket.on("join",(params,callback) => 
    {
       if(!isRealString(params.name) || !isRealString(params.room))
      {
        return callback("Name and Room are required");
      }
      else
      {
         socket.join(params.room);
         users.removeUser(socket.id);
         users.addUser(socket.id,params.name,params.room);
         io.to(params.room).emit("updateUserList",users.getUserList(params.room));
         socket.emit("newMessage",generateMessage("Admin","Welcome to chat app"));
         socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} has joined`));  
         callback();
      }
    });

   

    socket.on("createMessage",(message,callback) => 
    {
       // console.log(JSON.stringify(message,undefined,2));
       var user = users.getUser(socket.id);
       if(user)
       {
           io.to(user.room).emit("newMessage",generateMessage(user.name,message.text));
           

       }
        
        callback();
    });

    socket.on("createLocationMessage", (coords) => 
    {
        var user = users.getUser(socket.id);
        if(user)
           io.to(user.room).emit("newLocationMessage",generateLocationMessage(user.name,coords.latitude,coords.longitude));
    });

    socket.on("disconnect",() => 
    {
         var user = users.removeUser(socket.id);

         if(user)
         {
             io.to(user.room).emit("updateUserList",users.getUserList);
             io.to(user.room).emit("newMessage",generateMessage("Admin",`${user.name} has left.`))
         }
    });
});




server.listen(port,() => 
{
    console.log(`Server is up and running on port ${port}`);
});
