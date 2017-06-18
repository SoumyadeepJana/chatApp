

var socket = io();

function scrollToBottom()
{
    var messages = jQuery("#messages");
    var lastMessage = messages.children("li:last-child");
    var scrollTop = messages.prop("scrollTop");
    var clientHeight = messages.prop("clientHeight");
    var scrollHeight = messages.prop("scrollHeight");
    var lastMessageHeight = lastMessage.innerHeight();
    var prevMessageHeight = lastMessage.prev().innerHeight();

    if(clientHeight + scrollTop + lastMessageHeight + prevMessageHeight >= scrollHeight)
    {
        messages.scrollTop(scrollHeight);
    }

}

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
     li.append("<br><br>")
     jQuery("#messages").append(li);
     scrollToBottom();
     //jQuery("#messages").append("<br><br>");
     //var i =0;
   // jQuery(window).blur(notify(message.text));

     
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
    var anchor = jQuery('<a target=_blank>My Current Location</a>');
    li.text(`${locationMessage.from} [${timeStamp}]: `);
    anchor.attr("href",`${locationMessage.url}`);
    li.append(anchor);
    jQuery("#messages").append(li);
    scrollToBottom();
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




 /* var notify = (text) => {
    // If the user agreed to get notified
    // Let's try to send ten notifications
    if (window.Notification && Notification.permission === "granted") {
      //var i = 0;
      // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
     // var interval = window.setInterval(function () {
        // Thanks to the tag, we should only see the "Hi! 9" notification 
        var n = new Notification("Chat App", {tag: 'soManyNotification',body:text,icon:"/image/chat.png"});
       // if (i++ == 9) {
        //  window.clearInterval(interval);
        //}
      //}, 200);
    }

      else if (Notification.permission === "denied") {
        Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("ChatApp",{tag:"soManyNotification",body:text,icon:"/image/chat.png"});
      }
    });
  }
  }*/
  
