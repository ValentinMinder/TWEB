/**
 * Imports
 */
var http = require('http');
var url = require('url');

/**
 * Create a new HTTP server
 */
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write('Ce cours me fout le cancer.');
    res.end();
});

/**
 * Launch server by make it listen to the port 8080
 */
server.listen(80);