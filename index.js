//multer example

var express = require('express'),
 app = express(),
 fs=require('fs'),
 multer=require('multer'),
 bodyParser=require('body-parser');
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

var done=false;
var objResponse={Message:'',Status:''};

/*Configure the multer.*/

app.use(multer({ dest: './public/upload/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
},
onError:function(err){
 console.log(err);
 done=false;
}
}));

/*Handling routes.*/

app.get('/',function(req,res){
      //res.sendFile("index.html");
      res.sendFile(__dirname + '/index.html');
});
app.post('/api/photo',function(req,res){
     if(done==true)
      res.end("File uploaded.");
     else
      res.end("File upload failed.");
    console.log(req.body);
  
});
app.listen(3000);
console.log('Listening on port 3000...');
