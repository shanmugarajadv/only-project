var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var app = express();
var documents = require('./lib/documents.js');
var multer = require('multer');
var done       =       false;
var fileUploadPath = "./uploads/";
var newDest="";
var fs = require('fs');

app.use(multer({ dest: fileUploadPath,
changeDest: function(dest, req, res){
 var url=(req.url).toString();
 var filePath=url.split("/");
 // console.log("1"+filePath.length+"2"+filePath[2]+"3"+     	(req.url.toString()));
 // console.log("Req param"+req.url);
 dest+=filePath[filePath.length-1];

  if (!fs.existsSync(dest)){
    fs.mkdirSync(dest);
  }

 newDest=filePath[filePath.length-1];
 return dest;
    },

 rename: function (fieldname, filename) {
    return filename+Date.now();
  },

onFileUploadStart: function (file,req,res) {

  console.log(file.originalname + ' is starting ...')
},

onFileUploadComplete: function (file) {
 /* var document={};
 document.docName=file.path;
 document.techName=newDest;
 documents.addDocuments(document);
 console.log(file.fieldname + ' uploaded to  ' + file.path); */
 done=true;
}
}).array('multiInputFileName'));


app.post('/documents', documents.addDocuments);
app.get('/',function(req,res){
      res.sendfile("index.html");
});

app.post('/upload/:name',function(req,res){

  if(done==true){
    console.log(req.files);
    res.send("File uploaded.");
  }
});

app.set('port', process.env.PORT || 8001);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', serveIndex(__dirname + '/uploads'));
app.use('/uploads', serveStatic(__dirname + '/uploads'));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TechnoSuite');

module.exports = app;
