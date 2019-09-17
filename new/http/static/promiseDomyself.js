
var state_pending=0;
var state_fulfilled=1;
var state_rejected=2;
function Promise(fun){
	this.onFulfilled=[];
	this.onRejected=[];
	this.fullfilledValue=void(0);
	this.rejectedValue=void(0);
	this.sate=state_pending;
	if(fun&&typeof fun=='function')fun.call(this,this.resolve.bind(this),this.reject.bind(this));
	
}
Promise.prototype={
	resolve:function(value){
		this.state=state_fulfilled;
		this.fullfilledValue=value;
		runQueue.call(this,this.fullfilledValue,"onFulfilled")
	},
	reject:function(value){
		this.state=state_rejected;
		this.rejectedValue=value;
		runQueue.call(this,this.rejectedValue,"onRejected")
	},
	then:function(resolveCk,rejectCk){
		if(typeof resolveCk!=='function'||typeof rejectCk!=='function'){
			console.error("then 传入应为函数")
			return ;
		}
		var next=new Promise();
		this.onFulfilled.push(assembly(resolveCk,"state_fulfilled",next));
		this.onRejected.push(assembly(rejectCk,"state_rejected",next));
		if(this.state==state_fulfilled){
			runQueue.call(this,this.fullfilledValue,"onFulfilled")
		}
		if(this.state==state_rejected){
			runQueue.call(this,this.rejectedValue,"onRejected")
		}
		return next;
	}
}
Promise.all=function(arr){
	return new Promise(function(resolve,reject){
			var len=arr.length,results=[],resolveLen=0;
			if(len==0)resolve(results)
			for(var i=0;i<arr.length;i++){
				arr[i].then(function(result){
					results.push(result);
					resolveLen++;				
					if(resolveLen==len){
						resolve(results)
					}
				},function(result){
					reject(result)
				})	
			}
	})
}
Promise.race=function(arr){
	return new Promise(function(resolve,reject){
			var len=arr.length,results=[],resolveLen=0;
			if(len==0)resolve(results)
			for(var i=0;i<arr.length;i++){
				arr[i].then(function(result){
					resolve(result)
				},function(result){
					reject(result)
				})	
			}
	})
}
Promise.all=function(arr){
	return new Promise(function(resolve,reject){
			var len=arr.length,results=[],resolveLen=0;
			if(len==0)resolve(results)
			for(var i=0;i<arr.length;i++){
				arr[i].then(function(result){
					results.push(result);
					resolveLen++;				
					if(resolveLen==len){
						resolve(results)
					}
				},function(result){
					reject(result)
				})	
			}
	})
}
function runQueue(value,name){
	if(this[name].length==0)return;
	for(var i=0;i<this[name].length;i++){
		this[name][i](value);
	}
	this.onFulfilled=[];
	this.onRejected=[];
}
function assembly(ck,state,next){
	return function(value){
		var result;
		if(value instanceof Promise){
			result=value.then(ck)
		}
		if(state=="state_fulfilled"){
			next.resolve(ck(value));
		}
		if(state=="state_rejected"){
			next.reject(ck(value));
		}
	}
}
//promise 的几个问题       1.每次then产生不同的promise  2.并且上一次的队列重置 3.如果resolve的为一个promise 怎么处理
//4.   resolve（Promise.reject）会发生什么