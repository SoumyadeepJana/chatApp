

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
     var i =0;
     jQuery(window).blur(notify);

     
       // notify();
    

    
 });


jQuery("#message-form").on("submit",function (e) 
{
    e.preventDefault();
    var messageTextBox = jQuery("[name=message]");
    //console.log("hey",messageTextBox.val());
 
        if(messageTextBox.val().length>0)
        {
                socket.emit("createMessage",
                {
                    from:"USER",
                    text:messageTextBox.val()
                },function() 
                {
                    messageTextBox.val("");
            
                });
    
}});



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
    locationButton.addClass("disabled");
    locationButton.text("Sending...");
    

    navigator.geolocation.getCurrentPosition(function (position) 
    {
        //console.log(position);
        socket.emit("createLocationMessage",
        {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        locationButton.text("Send Location");
        locationButton.removeClass("disabled");
    

        

    },function () 
    {
        alert("Unable to fetch location");
        locationButton.text("Send Location");
        locationButton.removeClass("disabled");
    });
});




  var notify = () => {
    // If the user agreed to get notified
    // Let's try to send ten notifications
    if (window.Notification && Notification.permission === "granted") {
      //var i = 0;
      // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
     // var interval = window.setInterval(function () {
        // Thanks to the tag, we should only see the "Hi! 9" notification 
        var n = new Notification("Chat App", {tag: 'soManyNotification',body:"New Message",icon:"/image/chat.png"});
       // if (i++ == 9) {
        //  window.clearInterval(interval);
        //}
      //}, 200);
    }

      else if (Notification.permission === "denied") {
        Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("New message",{tag:"soManyNotification",body:"New Message",icon:"/image/chat.png"});
      }
    });
  }
  }
  
