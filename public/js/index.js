            /*var socket = io();

            socket.on("connect",function () 
            {
                console.log("Connected to server");
                socket.emit("createEmail",
                {
                    to:"sjana646@gmail.com",
                    text:"whats up?",
                    timestamp:"6:20" 
                });
            });

            socket.on("disconnect",function () 
            {
                console.log("Disconnected from server");
            });

            socket.on("newEmail",function (email) 
            {
                console.log(JSON.stringify(email,undefined,2));
            });*/


var socket = io();

socket.on("connect",function ()
{
    console.log("Connected to server");

    socket.on("newMessage",function (message) 
    {
         console.log(JSON.stringify(message,undefined,2));
    });

   /* socket.emit("createMessage",
    {
        to:"bittu",
        text:"hey bro!"
    }); */
});

socket.on("disconnect",function () 
{
    console.log("Disconnected from server");
});