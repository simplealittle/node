var fs=require("fs");
const execSync = require('child_process').execSync;

console.log("start")
var aa='aa.js'
execSync(`rm -r ${aa}`,function(error,stdout,stderr){
	if (error) {
		console.error(`执行的错误: ${error}`);
		return;
	  }
	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
});

//fs.readFile("./static/json/test.txt",function(err,data){
//	if(err){
//		console.log(err);
//	}else{
//		console.log(data);
//	}
//})
//var readStream=fs.createReadStream("./static/json/test.txt");

//写入文件
//fs.writeFile("./static/json/test.txt","2222222222",function(err){
//	if(err){
//		console.log(err);
//		return;
//	}
//})


//打开文件
//fs.open("./static/json/aa.txt","r+",function(err,fd){
//
//	if(err){
//		console.log("err:"+err);
//		return 
//	}	
//	console.log(fd);
//	var buf=new Buffer(8);
//	fs.read(fd,buf,3,5,null,function(err,bytesRead,buffer){
//		if(err){
//			console.log("readErr:"+err);
//			return 
//		}
//		console.log("byte:"+bytesRead);
//		console.log(buffer);
//	})
//})

//获取文件信息
//fs.stat( "./static/json/aa.txt",function(err,stats){
//	if(err){
//		return 
//	}
//	console.log(stats);
//	console.log(stats.isFile());
//	console.log(stats.isDirectory());
//})

//读取目录
//fs.readdir("./static", function(err,data){
//	if(err){
//		return
//	}
//	console.log(data)
//})

//重命名
//fs.rename("./static/aa.txt","./static/bb/aa.txt",function(data){
//	console.log(data)
//})

//删除目录  //没有回调参数
//fs.rmdir("./static/aaa",function(err){
//	console.log(err)
//})

//删除文件
//fs.unlink("./static/aaa/ddd.txt",function(err,data){
//	console.log(err)
//	console.log(data)
//});

//创建目录
//fs.mkdir("./static/aaaaa",function(err,data){
//	console.log(err)
//	console.log(data)
//});

//


// var readable=fs.createReadStream("static/aa.js");
// var writeable=fs.createWriteStream("./aa.js",{
// flags: 'w',
// encoding: 'utf8',
// fd: null,
// mode: 0o666,
// autoClose: true
// });
// readable.on("data",function(chunk){
// 	console.log("chunk")
// 	writeable.write(chunk);
// })
// readable.on("end",function(){
// 	console.log("1")
// })
// writeable.on("finish",function(){
// 	console.log("2")
// })

//可选参数处理
//fs.writeFile = function(path, data, options, callback) {
//var callback = maybeCallback(arguments[arguments.length - 1]);
//if (util.isFunction(options) || !options) {
//  options = { encoding: 'utf8', mode: 438 /*=0666*/, flag: 'w' };
//} else if (util.isString(options)) {
//  options = { encoding: options, mode: 438, flag: 'w' };
//} else if (!util.isObject(options)) {
//  throw new TypeError('Bad arguments');
//}
//assertEncoding(options.encoding);
//var flag = options.flag || 'w';
//fs.open(path, options.flag || 'w', options.mode, function(openErr, fd) {
//  if (openErr) {
//    if (callback) callback(openErr);
//  } else {
//    var buffer = util.isBuffer(data) ? data : new Buffer('' + data,
//        options.encoding || 'utf8');
//    var position = /a/.test(flag) ? null : 0;
//    writeAll(fd, buffer, 0, buffer.length, position, callback);
//  }
//});
//};