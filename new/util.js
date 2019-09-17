'use strict';
var http=require("http");
var path=require("path");
var url=require("url");
var querystring = require("querystring");
var util=require('util');

var util = require('util');
//var obj={
//	a:"11"
//}
//var result = util.inspect(obj);
//console.log(result);

//var fmt=util.format("%s:%s",11,22);
//console.log(fmt);

var isArray=util.isObject([1,2,3])
console.log(isArray);
//console.log(isArray);

var isDate=util.isDate(new Date());
console.log(isDate);



//isRegExp