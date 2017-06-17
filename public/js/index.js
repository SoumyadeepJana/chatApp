

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
     var timeStamp = moment(message.createdAt).format("h:mm a");
     console.log(JSON.stringify(message,undefined,2));
     var li = jQuery("<li></li>")
     li.text(`${message.from} [${timeStamp}] : ${message.text}`);
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
    var messageTextBox = jQuery("[name=message]");
    socket.emit("createMessage",
    {
        from:"USER",
        text:messageTextBox.val()
    },function() 
    {
        messageTextBox.val("");
        /*jQuery("#send").remove();
        var input = jQuery("<input type=text placeholder=Message name=message>") ;
        var button = jQuery("<button id=send>Send</button>");
        jQuery("#message-form").append(input);
        jQuery("#message-form").append(button);*/
    });
});

socket.on("newLocationMessage", function (locationMessage) 
{
    var timeStamp = moment(locationMessage.createdAt).format("h:mm a");
    var li = jQuery("<li></li>");
    var anchor = jQuery('<a target=_blank>Location</a>');
    li.text(`${locationMessage.from} [${timeStamp}]: `);
    anchor.attr("href",`${locationMessage.url}`);
    li.append(anchor);
    jQuery("#messages").append(li);
});

var locationButton = jQuery("#send-location");
locationButton.on("click",function() 
{
    if(!navigator.geolocation)
       return alert("Your browser does not support geolocation");

    var locationButton = jQuery("#send-location");
    locationButton.text("Sending...");
    locationButton.attr("disabled");

    navigator.geolocation.getCurrentPosition(function (position) 
    {
        //console.log(position);
        socket.emit("createLocationMessage",
        {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        locationButton.text("Send Location");
        

    },function () 
    {
        alert("Unable to fetch location");
        locationButton.text("Send Location");
    });
});