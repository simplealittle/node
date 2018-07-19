var fs=require("fs");
module.exports={
	"/filter.html":function(){
		fs.stat(__dirname+"/static//filter.html",function(err,stats){
			if(stats.isFile()){
				res.writeHead("200",{
					ContentType:'text/html;charset:utf-8'
				});
				fs.createstream(root+"/static/"+filter.html).pipe(res);
			}
		})
	}
}
