## 快速搭建本地web服务器

### 作为全局脚本使用

1、全局安装： ``npm install -g easy-node-server``

2、运行：``easy-node-server``

3、浏览器访问 [http://127.0.0.1:4444](http://127.0.0.1:4444)

---

##### 运行时指定端口号，不指定默认使用4444

~~~
easy-node-server -p 8080
~~~

##### 运行时指定静态文件路径，不指定默认使用easy-server的assets目录

~~~
easy-node-server -f /usr/local
~~~

在指定的目录里放任意文件，即可通过 http://127.0.0.1:4444/[文件名] 访问

> 对于.json为后缀的请求，支持jsonp

### 作为项目devDependencies使用

1. 运行 ``npm install easy-node-server --save-dev`` 安装依赖

2. 在项目package.json中增加script:

~~~
"scripts": {
    "easyServer": "easy-node-server -f ./assets"
},
~~~

3. 运行 ``npm run easyServer``

### 作为组件使用

~~~
var easyServer = require('easy-node-server');
easyServer.start({
    port: 4444,
    assetPath: '/work'
});
~~~
