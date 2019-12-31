var querystring = require("querystring");
var post=async (ctx,next)=>{
	var params=ctx.request.body||{};
	console.log(ctx.cookies.get('name'))
	// ctx.res.set("Access-Control-Allow-Credentials","true");
setTimeout(function(){
	ctx.response.set("Access-Control-Allow-Origin", "*");
	ctx.response.body="post111"
},1000)
		

	// ctx.response.body="post111"
	
	// ctx.response.body='cookies'+ctx.cookies.get('name')+params;
	// var request=ctx.req;
	// var requestData=await new Promise((resolve,reject)=>{
	// 	var postData;
	// 	request.addListener("data", function (postDataChunk) {
	// 		console.log("接收中");
	// 		postData += postDataChunk;
	// 	});
	// 	request.addListener("end",function(){
	// 		resolve(querystring.parse(postData))
			
	// 	})
	// })
}
module.exports={
	conType:'route',
	path:"/post",
	type:"post",
	handle:post
}
