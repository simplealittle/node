'use strict';
var http=require("http");
var path=require("path");


var url=require("url");
var querystring = require("querystring");
//console.log(process.argv);
var fs=require("fs");
var root = path.resolve(process.argv[2] || '.');
console.log("root路径:"+root)

const init =require('./net_init');

var server=http.createServer(function(request,response){
	//设置编码格式；
	request.setEncoding('utf-8');
	//获取url对象
	var urlObj=url.parse(request.url);
	//获取路径
 	var pathname = urlObj.pathname;
	//获取query
	var query=urlObj.query;
	

	
	//ajax接口 （get）
	if(urlObj.pathname==="/get"){
		
		// return;
		var params = querystring.parse(urlObj.query)
		console.log(params)
		response.writeHead(200, {
	        'Content-Type': 'text/plain;charset=utf-8'
		});
		setTimeout(function(){
			response.end(params.name+""+params.psw); 
		},1000)
		return;
		// response.end(params.name+""+params.psw); 
	}

	// response.end();
	//获取静态资源
	var filepath=path.join(__dirname,"static",pathname);
	fs.stat(filepath,function(err,stats){
		if(!err&&stats.isFile()){
			console.log("200");
			response.writeHead(200);
			fs.createReadStream(filepath).pipe(response);
		} 
		else {
			response.writeHead(404,{
		        'Content-Type': 'text/html;charset=utf-8'
		    });
			response.end("404(文件找不到)");    
        }
	})
	var postData='';
	request.addListener("data", function (postDataChunk) {
		console.log("接收中");
		postData += postDataChunk;
		
	});
	
	request.addListener("end",function(){
		console.log("接收完成");	

		//ajax接口 （post）
		console.log(urlObj.pathname)
		if(urlObj.pathname==="/post"){
			console.log('postData',postData)
			var params = querystring.parse(postData)
			init(request,response,params);
			// var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
			// response.writeHead(200, {
		    //     'Content-Type': 'text/plain;charset=utf-8'
			// });
			// setTimeout(function(){
			// 	response.end(params.name+""+params.psw); 
			// },0)

			// response.end(params.name+""+params.psw); 
		}			
	})
})

//自定义事件
//var EventEmitter=require("events").EventEmitter;h
//var event=new EventEmitter();
//event.on("some_event",function(){
//
//	console.log("hahah")
//	
//})
//setInterval(function(){
//		event.emit("some_event")
//		
//},2000)

////读取文件
//fs.readFile("static/test.txt","UTF-8",function(err,data){
//	if(err){
//		console.log(err)
//	}else{
//		console.log(data);
//	}
//	console.log(22)
//})

server.listen(1000);
console.log("1000端口 ing...")
