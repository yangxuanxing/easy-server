var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mine = require('./mine.json');

var config = process.env._easyServer || {};
var ASSET_PATH = config.assetPath || './';
var para = process.argv[2];
if(para == '-p'){
    config.port = process.argv[3];
}
var PORT = config.port || 4444;

function getPara(url, paraName){
	var reg = new RegExp(paraName + '=(\\w+)');
	var matches = url.match(reg);
	if(matches){
		return matches[1];
	}
};

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname.replace(/^\//, '') || 'index.html';
    var realPath = path.resolve(ASSET_PATH, pathname);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write(pathname + ' was not found on this server.');
            response.end();
        } else {
            fs.readFile(realPath, 'binary', function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end('Cannot open ' + pathname);
                } else {
                    var callback;
                    var contentType = mine[ext] || 'text/plain';
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    if(ext == 'json'){
                        callback = getPara(request.url, 'callback');
                        if(callback){
                            response.write(callback + '(');
                        }
                    }
                    response.write(file, 'binary');
                    if(callback){
                        response.write(')');
                    }
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);