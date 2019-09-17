var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wx4f4bc4dec97d474b'
var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
var encryptedData = 
	'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
	'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
	'9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
	'3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
	'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
	'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
	'/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
	'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
	'/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
	'8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
	'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
	'6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
	'/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
	'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
	'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
	'20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
	'Db/XcxxmK01EpqOyuxINew=='
var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

sessionKey="YzrzRhwKM2cDqdxWkta4Pg=="
appId="wx06053f18c6741368"
iv="6UoZfrUuRoweKQ20wGJoKQ=="
encryptedData="uAIfw6QUM6p9EsowJFlkMamEWROLOrwvJfJA9ZWY69VL/CFxmtWpcLyisqWsUktjhePNfsPNmAgW4IAIr7Iuj4CYUTDM8ZC4OqCsMmfVncxgietEmphHru63pPVAn+lexZzZrMlq1dknWpdKJ1kg8OLkE58ZR0675TL0YlAkyMb/pzrIBytw7S7bUZeyW6MOIy85XePOjCBdfHXuz//R/2ktj9AmvLHFtoYFjzCubVt60BV1uTgAJFTWNd8cC7NSrAhYTOpgWPty+Kta/U/dH9EsrBvJSkb8DoDgLHIbaw5P7mfpydJ1kXhtrW64cFoDp887W69AhbXocYV58ioOXybDaFsHJhXjeOknejm7ek+v+65naF6UvBfpXsf+U3JsCSsbSyqIU2WTqynkVL6l8uHCObifHomni0/T6vnomjSJqr7YvSEyZsV6Qz4ncyDPkfFD1MH0Ye761KwZhf4S+g=="



var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData , iv)


console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
