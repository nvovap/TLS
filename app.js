// var tls = require('tls');


var fs = require('fs');
var https = require('https');
var app = require('express')();


var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};



app.get('/', function (req, res) {
   res.send('Hello World!');
});


app.get('/test', function (req, res) {
   res.send('TEST OK !!!');
});

https.createServer(options, app).listen(3000, function () {
   console.log('Started!');
});


// tls.createServer(options, function (s) {
//   s.write("welcome!\n");
//   //s.pipe(s);
// }).listen(8000);



// http.createServer(app).listen(app.get('port'), function(){
//   //console.log("Express server listening on port " + app.get('port'))

//   log.info("Express server listening on port " + app.get('port'))
// });