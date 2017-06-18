var moment = require("moment");

var date = moment();

var d = date.format("MMM YYYY DD HH MM");

if(!("Notification" in window))
   return alert("Browser doesn't support notifications");
else
{
    if(Notification.permission === "granted")
    {
        var n = new Notification(d);
    }

    else if(Notification.permission === "denied")
    {
        Notification.requestPermission().then((permission) => 
        {
            if(Notification.permission === "granted")
            {
                var n = new Notification(d);
                setTimeout(n.close.bind(n), 5000);
            }


        });
    }
}