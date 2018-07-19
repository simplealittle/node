var get=async (ctx,next)=>{
	var params=ctx.query||{};
	console.log("1111111111")
	ctx.response.body=params.name+""+params.psw;
}
module.exports={
	"/get":{
		type:"get",
		handle:get
	}
}
