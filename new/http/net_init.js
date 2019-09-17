var url = require("url");
var path = require('path');
var fs = require("fs");
var http = require("http");
var request = require("request");
//var bufferhelper = require('bufferhelper');
var cb = require("./netcb");
//var querystring = require('qs');
var rootPath = path.dirname(path.dirname( __dirname));
console.log("__dirname:" + __dirname);
console.log("rootPath:" + rootPath);

function net_init(req, res,bpdydata){

    if (req.method.toLowerCase() === "options") {
        res.set("Access-Control-Allow-Origin","*");
        res.set("Access-Control-Allow-Credentials","true");
        res.set("Access-Control-Allow-Headers","X-Requested-With, Origin, token, userid, orgid, appkey, authInfo, Authorization, cookie, tplussid ,Content-Type");
        res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.end();
        console.log("Options Rquest");
        return;
    }
    
    Application.doRequest("http://cia.chanapp.chanjet.com/internal_api/client_authentication_with_userInfo",req, res, req.method.toLocaleLowerCase() === "get" ? undefined : bpdydata);
    return;
    //请求
    if(req.query.url){

        if(req.body&&req.body.Apis){
            var methodName = JSON.parse(req.body.Apis).Method;
            console.log('methodName======'+methodName);
            var mockFilePath =  rootPath + "/mockdata/" + methodName.substring(methodName.lastIndexOf(".")+1)+".json";
            console.log('mockFilePath======'+mockFilePath);
            fs.exists(mockFilePath,function(exists){
                if(exists){
                fs.readFile(mockFilePath, function (err, data) {
                    Application.renderJson(res,''+data);
                });
                }else{
                    Application.doRequest(req.query.url,req, res, req.method.toLocaleLowerCase() === "get" ? undefined : req.body);
                }
                return;
            });
            return;

        }else{
            Application.doRequest(req.query.url,req, res, req.method.toLocaleLowerCase() === "get" ? undefined : req.body);
            return;
        }
    }

    //本地静态资源
    var uri = url.parse(req.url);
    var urlPath = uri && uri.path && uri.pathname;
    if (!urlPath) return;
    var isMatch = urlPath && urlPath.match(new RegExp("/"));
    if (isMatch) {
        var pathName = rootPath + urlPath;
        Application.render(res, pathName);
    }

}

var Application = {
    render: function (response, pathname) {
            //隐藏nodejs代码显示
            if(pathname.indexOf("/nodejs/")==-1){
                fs.exists(pathname, function (exists) {
                if (exists) {
                    var extName = path.extname(pathname);
                    response.writeHead(200, (cb.webserver.headerConfig[extName] || cb.webserver.headerConfig["default"]));
                    fs.readFile(pathname, function (err, data) {
                        response.end(data);
                    });
                }
                else
                    Application.errorPage(response, pathname);
                });
            }else{
                Application.errorPage(response, pathname);
            }
    },
    doRequest: function (url,request, response, bodyData, callback) {
        ServiceProxy.init({ url: url, request: request, response: response, bodyData: bodyData, callback: callback });
        ServiceProxy.doRequest(request.method);
    },
    renderJson: function (response, obj) {
      console.log("send response=================================================");
        response.set("content-type", "application/json;charset=UTF-8");
        // response.setHeader("Access-Control-Allow-Origin", "*");
        response.set("Access-Control-Allow-Origin", "*");
        response.end(obj);
    },
    errorPage: function (response, pathname) {
        console.log("response pathname:" + pathname);
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404 Not Found</h1>");
    }
};


var ServiceProxy = {
    init: function (context) {
        this._context = context;
        
        return this;
    },
    get: function () {
      var context = this._context;
      request(context.url, function (error, response, data) {
        console.log('=====request=======get======');
        console.log(data)
        context.response.end(data) 
        // if (!error && response.statusCode == 200) {
        //     context.response.end("111")    
        // }
        return;
      });
    //   context.response.end("222") 
      return;
    },
    post: function () {
      var context = this._context;
      var headers = {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
          'Content-Type' : 'application/x-www-form-urlencoded'
      };
      var headKeys = ['appkey','userid','orgid','token','Authorization','authInfo'];
      var length = headKeys.length;
      console.log('context.request.headers==',context.request.headers);
      for(var i=0;i<length;i++){
         var headKey = headKeys[i];
         if(context.request.headers[headKey.toLowerCase()]){
            headers[headKey] = context.request.headers[headKey.toLowerCase()];
         }
      }
      if(context.request.headers['sid']){
         //解决saas cookie传递的问题
         headers.Cookie = context.request.headers['sid'];
      }
      request.post({ url: context.url, form: context.bodyData,headers:headers}, function(error, response, data) {
            if(response){
              if (!error && response.statusCode == 200) {
                console.log("response=======data======"+data);
                // context.response.set("Access-Control-Allow-Origin", "*");
                context.response.end(data);
              }else{
                context.response.status(response.statusCode);
                console.log("response.statusCode======="+response.statusCode+" | data : "+data);
                context.response.set("Access-Control-Allow-Origin", "*");
                context.response.end(data);
              }
            }else{
              context.response.status(404);
              context.response.end("404:服务未找到");
            }
            return;
      });
    },
    doRequest: function (method) {
        switch (method) {
          case "POST":
            this.post();
            break;
          case "GET":
            this.get();
          default:
            break;
        }
    }
};

module.exports = net_init;
    