'use strict'
var prefix = 'http://47.104.184.132:2000/';
var url = '47.104.184.132';
var port = '2000';
var http=require('http');
var querystring = require('querystring');

function getip() {
	function rn() {
		return Math.floor(Math.random()*255)
	}
	let ips = [rn(),rn(),rn(),rn()];
	return ips.join(".");
}

let user= [];
let count = 0;
let questioncount = 0;

function getuser() {
	var option = {
	    method: 'post',
	    host: url,
	    port: port,
	    path: '/manage/user',
	    headers: {// 必选信息
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Content-Length": 0,
	        "X-Forwarded-For": getip()
	    }
	};
	
	var Dispose = function(response){
	    var result = '';
	    response.on('data',function(data){
	    	result += data.toString();
	    });
	    response.on('end',function(){
	    	result = JSON.parse(result.toString());
	    	count = result.count;
	    	getoneuser();
	    });
	};
	var req = http.request(option,Dispose);
	req.end();
}

function getoneuser() {
	var  contents = querystring.stringify({
		limit: 1, skip: Math.floor(Math.random()*count)
	});
	var option = {
	    method: 'post',
	    host: url,
	    port: port,
	    path: '/manage/user',
	    headers: {// 必选信息
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Content-Length": contents.length,
	        "X-Forwarded-For": getip()
	    }
	};
	
	var Dispose = function(response){
	    var result = '';
	    response.on('data',function(data){
	    	result += data.toString();
	    });
	    response.on('end',function(){
	    	result = JSON.parse(result.toString());
	    	if (result.list[0]) {
	    		login({
		    		cell: result.list[0].cell,
		    		psw: result.list[0].psw
		    	})
	    	}
	    	
	    });
	};
	var req = http.request(option,Dispose);
	req.write(contents);
	req.end();
}

function login(item) {
	var  contents = querystring.stringify({
		user: JSON.stringify({
		    cell: item.cell,
		    psw: item.psw
		})
	});
	var option = {
	    method: 'post',
	    host: url,
	    port: port,
	    path: '/api/login',
	    headers: {// 必选信息
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Content-Length": contents.length,
	        "X-Forwarded-For": getip()
	    }
	};
	var Dispose = function(response){
	    var result = '';
	    response.on('data',function(data){
	    	result += data.toString();
	    });
	    response.on('end',function(){
	    	result = JSON.parse(result.toString());
	        item.id = result._id;
	        item.unum = result.num;
	        item.point = result.point;
	        item.cell = result.cell;
	    	guessmenu4(item);
	    });
	};
	var req = http.request(option,Dispose);
	req.write(contents);//发送内容
	req.end();
}

function guessmenu4(item) {
	var option = {
	    method: 'post',
	    host: url,
	    port: port,
	    path: '/manage/question',
	    headers: {// 必选信息
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Content-Length": 0,
	        "X-Forwarded-For": getip()
	    }
	};
	var Dispose = function(response){
	    var result = '';
	    response.on('data',function(data){
	    	result += data.toString();
	    });
	    response.on('end',(data) => {
	    	result = JSON.parse(result.toString());
	    	questioncount = result.count;
	    	guessmenu(item);
	    });
	};
	var req = http.request(option,Dispose);
	req.end();
}

function guessmenu(item) {
	let skip = Math.floor(Math.random()*questioncount);
	var  contents = querystring.stringify({
		limit: 1, skip: skip
	});
	var option = {
	    method: 'post',
	    host: url,
	    port: port,
	    path: '/manage/question',
	    headers: {// 必选信息
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Content-Length": contents.length,
	        "X-Forwarded-For": getip()
	    }
	};
	var Dispose = function(response){
	    var result = '';
	    response.on('data',function(data){
	    	result += data.toString();
	    });
	    response.on('end',(data) => {
	    	result = JSON.parse(result.toString());
	    	if (result.list[0]) {
	    		if (result.list[0].state != 0) {
		    		guessmenu(item);
		    	} else {
			        item.qnum = result.list[0].num;
			        let options = result.list[0].options;
			        let k = Math.ceil(Math.random()*options.length);
			        item.optionid = k-1;
			        item.pit = Math.min(Math.max(Math.floor(Math.random()*Math.floor(item.point/result.list[0].perpoint)),1),10);
			        item.option = options[k-1];
			        item.question = result.list[0].question;
			        item.perpoint = result.list[0].perpoint;
			        item.date = result.list[0].date;
			        item.qid = result.list[0].qid;
			        guess(item);
		    	}
	    	}
	    	
	    });
	};
	var req = http.request(option,Dispose);
	req.write(contents);
	req.end();
}

function guess(item) {
	var contents = querystring.stringify({
		id: JSON.stringify(item.qnum),
		optionid: JSON.stringify(item.optionid),
		option: JSON.stringify(item.option),
		pit: JSON.stringify(item.pit),
		unum: JSON.stringify(item.unum),
		qnum: JSON.stringify(item.qnum),
		question: JSON.stringify(item.question),
		perpoint: JSON.stringify(item.perpoint),
		qid: JSON.stringify(item.qid),
		date: JSON.stringify(new Date(item.date)),
		pointid: JSON.stringify(item.qid+''+item.cell+Date.now())
	});

	var option = {
	    method: 'post',
	    host: url,
	    port: port,
	    path: '/api/guess',
	    headers: {// 必选信息
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Content-Length":contents.length,
	        "X-Forwarded-For": getip()
	    }
	};
	var Dispose = function(response){
	    var result = '';
	    response.on('data',function(data){
	    	result += data.toString();
	    	console.log(result);
	    });
	    response.on('end',function(){
	    	console.log(`guess success,
userid: ${item.unum},
questionid:${item.qid}`)
	    });
	    response.on('error',function(e){
	    	console.log(e)
	    });
	};
	var req = http.request(option,Dispose);
	req.write(contents);
	req.end();
}

function start() {
	getuser();
	let inter = setInterval(() => {
		getuser();
	}, 1000 * 60 * 2);
}
start();
