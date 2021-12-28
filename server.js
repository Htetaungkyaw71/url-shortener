require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({extended:true}))

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



var short = 1
var api = []
app.post("/api/shorturl", (req,res)=>{
  var original = req.body.url
  if(original.includes('https://')){
    short++;
      api.push({
        original_url:original,
        short_url:short
      })
      res.json({
        original_url:original,
        short_url:short
      });
     
  } 
  else{
    res.json({ error: 'invalid url' })
  }
  
})

// Your first API endpoint
app.get('/api/shorturl', function(req, res) {
  res.json(
    { original_url : 'https://freeCodeCamp.org', short_url : 1}
  )
});

app.get('/api/shorturl/:name', function(req, res) {

  let n = +req.params.name;
  if(typeof n != "number"){
    res.json({ error: 'wrong format' })
  }
  api.forEach(function(p){
    console.log(p.short_url);
    console.log(p.original_url);
    if (+p.short_url === n){ 
      res.redirect(301,p.original_url)
    }
  })
  
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
