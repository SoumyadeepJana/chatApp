

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
     var li = jQuery("<li></li>")
     li.text(`${message.from} : ${message.text}`);
     jQuery("#messages").append(li);
 });

  /* socket.emit("createMessage",
    {
        to:"bittu",
        text:"hello"
    },function () 
    {
        console.log("Got it");
    }); */

jQuery("#message-form").on("submit",function (e) 
{
    e.preventDefault();
    socket.emit("createMessage",
    {
        from:"USER",
        text:jQuery("[name=message]").val()
    },function() 
    {
        jQuery("[name=message]").remove();
        jQuery("button").remove();
        var input = jQuery("<input type=text placeholder=Message name=message>") ;
        var button = jQuery("<button>Send</button>");
        jQuery("#message-form").append(input);
        jQuery("#message-form").append(button);
    });
});