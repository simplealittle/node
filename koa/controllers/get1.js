var get=async (ctx,next)=>{
	var params=ctx.query||{};
	console.log("11111")
	ctx.cookies.set('name', 'tobi', { signed: true });
	ctx.response.set("Access-Control-Allow-Origin",'*');//设置响应头禁止浏览器拦截；
	// setTimeout(function(){
		ctx.response.body="proxy"+"涛涛";
	// },1000)
	return
}
module.exports={
	conType:'route',
	path:"/get",
	type:"get",
	handle:get
}
