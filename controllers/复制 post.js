var post=async (ctx,next)=>{
	var params=ctx.request.body||{};
	console.log(1)
	ctx.response.body=params.name+""+params.psw;
}
module.exports={
	conType:'route',
	path:"/post",
	type:"post",
	handle:post
}
