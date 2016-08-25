// var tls = require('tls');


var fs = require('fs');
var https = require('https');
var app = require('express')();
const crypto = require('crypto');


var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};


app.get('/spkac', function (req, res) {
   fs.readFile("spkac.cnf", function(error, buffer) {
  		if (error)
    		throw error;

  		const cert = crypto.Certificate();	

  		const result = cert.verifySpkac(buffer);

		console.log(result);


		if (result){
			res.send('TEST OK !!!');
		} else {
			res.send('TEST no OK !!!');
		} 
		 

	});
});


app.get('/cipher', function (req, res) {

	const cipher = crypto.createCipher('aes192', '1qazxsw23edcvfr4');

	var encrypted = cipher.update('Владимир привет что тут зашифрованно', 'utf8', 'hex');
	encrypted += cipher.final('hex');
	console.log(encrypted);

	res.send(encrypted);
});

app.get('/decipher', function (req, res) {
	const decipher = crypto.createDecipher('aes192', '1qazxsw23edcvfr4');

	var decrypted = '';
	decipher.on('readable', () => {
	  var data = decipher.read();
	  if (data)
	  decrypted += data.toString('utf8');
	});
	decipher.on('end', () => {
	  console.log(decrypted);
	  // Prints: some clear text data

	  res.send(decrypted);
	});
					 
	var encrypted = '6b0d46ab3e6beb2a8c0e6a4a002a540dc8da56429019e4c820d736233a9d7a79686108de7dce1fc6a0d7b764ae3df96db72bc3768a1bacc5f5b0d8e4bbad720fa3c2644f659cfcc80a9b6a35505dd68a';
	decipher.write(encrypted, 'hex');
	decipher.end();


});


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