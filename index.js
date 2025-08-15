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

app.get("/api/:date?", function (req, res) {
  let fecha;
  let fe2;
  if(req.params.date==null){
    fecha=new Date();
    fe2=Math.floor(fecha.getTime());
  }else if(req.params.date.includes("-")){
    fecha= new Date(req.params.date);
    fe2=Math.floor(fecha.getTime());
  }else{
    let temp=Number(req.params.date);
    if(req.params.date.length==10){
      temp=temp*1000;
    }
    fe2=parseInt(req.params.date);
    fecha=new Date(temp);
  }  
  let correcto=!isNaN(new Date(fecha));
  if(correcto){
    res.json({unix: fe2, utc:fecha.toUTCString()});
  }else{
    res.json({error:"Invalid Date"})
  } 
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
