var get=async (ctx,next)=>{
	var params=ctx.query||{};
	console.log("11111")
	ctx.response.body=params.name+""+params.psw+"proxy";
}
module.exports={
	conType:'route',
	path:"/get",
	type:"get",
	handle:get
	
}
