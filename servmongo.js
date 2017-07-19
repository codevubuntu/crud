var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080 ;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


//gestion du serveur HTTP
var express = require('express');
var app = express();

app.get('/', function (req, res) {
res.sendfile(__dirname + '/app/exmongo.html');
});

app.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);
