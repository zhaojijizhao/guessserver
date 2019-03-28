'use strict'
var prefix = 'http://47.104.184.132:2000/';
var url = '47.104.184.132';
var port = '2000';
var http=require('http');  
var querystring = require('querystring');
var fs = require('fs');


// http.get(prefix + 'api/user',function(req,res){  
//     var html='';  
//     req.on('data',function(data){  
//         html+=data;  
//     });  
//     req.on('end',function(){  
//         console.info(html);  
//     });  
// });
function getitem() {
	return { 
		cell:'13' + Math.ceil(Math.random()*1000000000),
		psw: Math.ceil(Math.random()*1000000)
	}
}

function send(cell, psw) {
	var contents = querystring.stringify({
		user: JSON.stringify({
		    cell: cell,
		    psw: psw
		})
	});
	var option = {
	    method: 'post',
	    host: url,
	    port: port,
	    path: '/api/user/back',
	    headers: {// 必选信息
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Content-Length":contents.length,
	    }
	};
	var Dispose = function(response){
	    var result = '';
	    response.on('data',function(data){
	    	let result = JSON.parse(data.toString());
	    });
	    response.on('end',function(){
	    });
	};
	var req = http.request(option,Dispose);
	req.write(contents);//发送内容
	req.end();
}

// function save(str) {
// 	str += '\n';
// 	var data = fs.readFileSync('./auto/log/user.txt', 'utf8');
// 	fs.writeFileSync('./auto/log/user.txt',data+str);
// }

function start(num) {
	let i = 1;
	let inter = setInterval(() => {
		let item = getitem();
		send(item.cell, item.psw);
		i++;
		if (i == num) {
			clearInterval(inter);
		}
	}, 1000);
}
start(1000);