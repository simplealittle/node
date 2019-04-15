var get=async (ctx,next)=>{
	var params=ctx.query||{};
	console.log("11111111144441")
	ctx.response.body=params.name+""+params.psw;
}
module.exports={
	"/get":{
		type:"get",
		handle:get
	}
}
