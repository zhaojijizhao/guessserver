'use strict'
var prefix = 'http://127.0.0.1:2000/';
var url = '127.0.0.1';
var port = '2000';
var http=require('http');  
var querystring = require('querystring');
var fs = require('fs');
var _ = require('lodash');

let charlist = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomchar() {
	let char = charlist[Math.floor(Math.random()*charlist.length)];
	return char;
}

function getrandomstr(len) {
	let arr = new Array(len);
	arr = _.map(arr, (v, k) => (randomchar()));
	return arr.join("");
}

function getcodelist(num, len) {
	let arr = new Array(num);
	return _.map(arr, (v, k) => (getrandomstr(len)));
}

function sendcode(str, success) {
	var contents = querystring.stringify({
		code: JSON.stringify({
			code: str
		})
	});
	var option = {
	    method: 'post',
	    host: url,
	    port: port,
	    path: '/manage/code/add',
	    headers: {// 必选信息
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
	        "Content-Length":contents.length,
	    }
	};
	var Dispose = function(response){
	    var result = '';
	    response.on('data',function(data){
	    	console.log('ok');
	    	if (success) {
	    		success();
	    	}
	    });
	    response.on('end',function(){
	    });
	};
	var req = http.request(option,Dispose);
	req.write(contents);
	req.end();
}

function start() {
	let list = getcodelist(100, 6);
	let i = 0;
	function circle() {
		if (i < list.length) {
			sendcode(list[i], circle);
			i++;
		}
	}
	circle();
}

start();