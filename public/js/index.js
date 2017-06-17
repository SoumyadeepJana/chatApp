

var socket = io();

socket.on("connect",function ()
{
    console.log("Connected to server");


  
});

socket.on("disconnect",function () 
{
    console.log("Disconnected from server");
});


 socket.on("newMessage",function (message) 
 {
     console.log(JSON.stringify(message,undefined,2));
 });

   socket.emit("createMessage",
    {
        to:"bittu",
        text:"hello"
    },function () 
    {
        console.log("Got it");
    }); 

JQuery("#message-form").on("submit",function (e) 
{
    e.preventDefault();
});