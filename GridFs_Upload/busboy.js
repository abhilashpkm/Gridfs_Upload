
//busboy example
var fs=require('fs'),
 express = require('express'),
 app = express(),
 bodyParser=require('body-parser'),
 mongoose = require("mongoose"),
 ObjectID=mongoose.Types.ObjectId,
 Grid=require('gridfs');
mongoose.connect('mongodb://localhost/Db_Gridfs');
  var db = mongoose.connection;
  var gfs = Grid(mongoose.connection.db, mongoose.mongo);


  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    // yay!
    console.log('connected to db');
  });

app.use(bodyParser.json({limit: '2gb'}));
app.use(bodyParser.urlencoded({ extended: false ,limit:'2gb'}));
app.use(function(req, res, next) {
    //res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-reqed-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

app.get('/',function(req,res){

  //res.sendFile('busboy.html');
  res.sendFile(__dirname + '/busboy.html');
})


app.post('/add',function(req,res){

var content=req.body.Content;
var FileName=req.body.FileName;

console.log(content.length);

 gfs.writeFile({},content, function (err, file) {
   if(!err){
      console.log('wrote to ' + file._id);
      res.send('Write');
   }
   else
      res.send(err);
  });

    
});

app.get('/File/:Id',function(req,res){
  Id=req.params.Id;
 gfs.readFile({_id:Id},function (err, buffer) {
    console.log('ReadFile');
    if(!err)
      res.send(buffer.toString('utf8'));
    else
      res.send(err);
   // console.log(buffer.toString('utf8'));
   
  }); 

// res.send('Read');

});



//uploading file to mongoose 




app.listen(5000);
console.log('Listening on port 5000...');
