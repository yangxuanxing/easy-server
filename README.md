## 快速搭建本地web服务器

### 1. 安装

~~~~
git clone git@github.com:518yxx/easy-server.git
~~~~

### 2. 运行

~~~~
node index.js
~~~~

或者指定端口号，不指定默认使用4444

~~~~
node index.js -p 8080
~~~~

或者指定静态文件路径，不指定默认使用easy-server的assets目录

~~~~
node index.js -f /usr/local
~~~~

### 3. 使用

访问[127.0.0.1:4444/index.html](http://127.0.0.1:4444/index.html)
	
在当前目录放入任意文件,访问 “127.0.0.1:4444/[文件名]” 即可。
	
> 对于.json为后缀的请求，支持jsonp