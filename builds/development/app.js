var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('builds/development/'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

var server = app.listen(app.get('port'), function() {
	console.log('Listening on port ' + app.get('port'));
});
