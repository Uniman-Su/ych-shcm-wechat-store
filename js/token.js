function refreshToken(){
	var URL = "http://inf.kuaicarkeep.com/";
	var token = sessionStorage.getItem('admintoken');
	var exp = sessionStorage.getItem('adminexp');
	var now = new Date().getTime();
	var time = parseInt(((exp - now) / 1000 - 600) * 1000);
	//console.log(time);
	setTimeout(function() {
		token = sessionStorage.getItem('admintoken');
		mui.ajax({
			type: "post",
			url: URL+"console/logon/refreshToken",
			data: token,
			headers:{
				"Content-Type": "text/plain"
			},
			dataType: "json",
			success: function(data) {
				var newToken = data.data;
				var base64Str = newToken.split('.')[1];
				var base = new Base64();
				var result2 = base.decode(base64Str);
				result2 = result2.substring(result2.indexOf("{"));
				result2 = result2.substring(0, result2.lastIndexOf("}") + 1);
				var result2 = JSON.parse(result2);
				var newexp = new Date(result2.exp * 1000).getTime();
				sessionStorage.setItem('adminexp', newexp);
				sessionStorage.setItem('admintoken', newToken);
				/*token = newToken;
				exp = newexp;*/
			}
		});
	}, time);
	if(!token) {
		//location.href = 'login.html';
	}
}