var express = require('express');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, '')));

app.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});