var crypto = require('crypto');
// var decrypt = function (key, iv, crypted) {
//     // crypted = new Buffer(crypted, 'base64').toString('binary');
//     // key = new Buffer(key, 'base64').toString('binary');
//     // iv = new Buffer(iv, 'base64').toString('binary');

//     var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
//     var decoded = decipher.update(crypted, 'binary', 'utf8');
//     decoded += decipher.final('utf8');
//     return decoded;
//   };
//   var decrypt = function (a, b, crypted){
//     crypted = new Buffer(crypted, 'base64');
//     var decipher = crypto.createDecipheriv('aes-128-cbc', a, b);
//     var decoded = decipher.update(crypted,'base64','utf8');
//         decoded += decipher.final('utf8');
//     return decoded;
// };
 
var decrypt = function (key, iv, crypted) {
    crypted = new Buffer(crypted, 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decoded = decipher.update(crypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
};
var encrypt = function (key, iv, data) {
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');
    return crypted;
};

var key = '751f621ea5c8f930';
console.log('加密的key:', key.toString('hex'));
var iv = '2624750004598718';
console.log('加密的iv:', iv);
var data = "Hello, nodejs. 演示aes-128-cbc加密和解密";
console.log("需要加密的数据:", data);
var crypted = encrypt(key, iv, data);
console.log("数据加密后:", crypted);
var dec = decrypt(key, iv, crypted);
console.log("数据解密后:", dec);

key="M3jJEHDgUGlemcbMBew5cA=="
iv="67R77m7GPLs1AdzvTa6iZw=="
crypted="iQnkn7h3UI6P/NepPZPUvxjAmqtQD34qlPi8n0RvsdvqbVv2nA+G9rwb2462QfTuTw1y3KbcdTNVbd4YBOgFexkWO0r++nZrXkDgyaN/FtToobDzaDVzpZlw1BAk0h7In9ST9hrwgTeoGQHbvRsK8K2F3CkDLyTRT4Mn/cigyhdyc5LuGUdww+AOr5Nx2tB3hiLAl2SXBDHwz9cPHGvUrYIjcqRpyzNAjHc5KSHFW9ASrFt3Esc35Lnx5r63XKSky8kfUNRERWJDk6ffGwowUzJgpl2I6sPfOgpddGp9JPCJ4sNU8lqGuddm9k/Dul4tDV5liv/pssXMn7sxwjHbKTRt1M10AIgTKl9KXdBJKEl29tOaDY18fqADQuPMyJXtGgcMJX0wwr5N9PZB0fdRmHwG37Pw+D62/v3JqsGjDIOLbuBRQ27R1sP3PUHj2xdFAMrzBOkYW2SWDoFdaii4rQ=="  
  var ss=decrypt(key, iv, crypted)
  console.log(ss)