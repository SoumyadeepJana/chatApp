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



background: -moz-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ff3.6+ */
  background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(49,84,129,1)), color-stop(100%, rgba(39,107,130,1))); /* safari4+,chrome */
  background: -webkit-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ie10+ */
  background: linear-gradient(325deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* w3c */