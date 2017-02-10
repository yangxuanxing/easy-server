var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mine = require('./lib/mine.json');

function getPara(url, paraName){
    var reg = new RegExp(paraName + '=(\\w+)');
    var matches = url.match(reg);
    if(matches){
        return matches[1];
    }
};

function createServer(config){
    config = config || {};
    var assetPath = config.assetPath || path.resolve(__dirname, 'assets');

    return http.createServer(function(request, response) {
        // support CORS
        response.setHeader('Access-Control-Allow-Origin', `${request.headers.origin || "*"}`);
        response.setHeader('Access-Control-Allow-Credentials', 'true');
        if(request.method === 'OPTIONS'){
            response.setHeader('Access-Control-Allow-Methods', '*');
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-requested-with,*');
            response.setHeader('Access-Control-Max-Age', '86400');
            response.writeHead(200);
            response.end();
            return;
        }

        console.log('---------------request from-----------------');
        console.log(request.url);
        var pathname = url.parse(request.url).pathname.replace(/^\//, '') || 'index.html';
        var realPath = path.resolve(assetPath, pathname);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';

        fs.exists(realPath, function(exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': mine.txt
                });
                response.write(pathname + ' was not found on this server.');
                response.end();
                return;
            }

            fs.readFile(realPath, 'binary', function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': mine.txt
                    });
                    response.end('Cannot open ' + pathname);
                } else {
                    var callback = getPara(request.url, 'callback');
                    var contentType = mine[ext] || mine.txt;

                    if(ext == 'json' && callback){
                        contentType = mine.js;
                    }
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });

                    if(ext == 'json' && callback){
                        response.write(callback + '(');
                    }
                    response.write(file, 'binary');
                    if(ext == 'json' && callback){
                        response.write(')');
                    }
                    response.end();
                }
            });
        });
    });
};

module.exports.start = function(config){
    config = config || {};
    createServer(config).listen(config.port || 4444, function(){
        console.log(`服务启动成功，可以用浏览器访问：http://localhost:${config.port || 4444} 确认\n`);
    });
}