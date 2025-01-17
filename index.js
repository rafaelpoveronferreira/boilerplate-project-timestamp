// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp microsservice
app.get('/api', (req, res) => {
      let date = new Date();
      res.json({ unix: date.getTime(), utc: date.toUTCString() 
    })
});

app.get('/api/:date', (req, res) => {
    let time = req.params.date;
  
    if(/\d{5,}/g.test(time)) {
      res.json({ unix: parseInt(time), utc: new Date(parseInt(time)).toUTCString() });
    } else {
      let date = new Date(req.params.date);

      console.log(date.toString())
      if(date.toString() == "Invalid Date") {
        res.json({ error: "Invalid Date" })
      } else {
      res.json({ unix: date.getTime(), utc: date.toUTCString() })
      };
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
