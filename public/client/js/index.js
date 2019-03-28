"use strict";

var prefix = "http://47.104.184.132:2000";

function setuser(bool) {
	var txt = bool ? "运行中" : "未运行";
	document.getElementById("hasuser").innerHTML = txt;
}

function setguess(bool) {
	var txt = bool ? "运行中" : "未运行";
	document.getElementById("hasguess").innerHTML = txt;
}

function ajax(param){
  _.map(param.data, function(v, k){
    param.data[k] = JSON.stringify(v);
  });
  $.ajax({
    url: param.url,
    type: param.type || 'post',
    dataType: 'json',
    data: param.data || {},
    success:function(result){
      param.success(result);
    },
    error:function(error){
      if(param.error){
        param.error(error);
      }else{
        alert( param.info + '失败');
      }
    }
  });
};

function checkuser(){
  var _this = this;
  ajax({
    url: prefix+'/manage/auto/user',
    info: '',
    success:function(result){
    	setuser(result.has);
    }
  });
};

function checkguess(){
  var _this = this;
  ajax({
    url: prefix+'/manage/auto/guess',
    info: '',
    success:function(result){
      setguess(result.has);
    }
  });
};

function startuser(){
  var _this = this;
  ajax({
    url: prefix+'/manage/auto/user/start',
    info: '',
    success:function(result){
      alert('成功');
      checkuser();
    },
    error: function(result) {
      alert('失败');
      checkuser();
    }
  });
};

function stopuser(){
  var _this = this;
  ajax({
    url: prefix+'/manage/auto/user/stop',
    info: '',
    success:function(result){
      alert('成功');
      checkuser();
    },
    error: function(result) {
      alert('失败');
      checkuser();
    }
  });
};

function startguess(){
  var _this = this;
  ajax({
    url: prefix+'/manage/auto/guess/start',
    info: '',
    success:function(result){
      alert('成功');
      checkguess();
    },
    error: function(result) {
      alert('失败');
      checkguess();
    }
  });
}
function stopguess(){
  var _this = this;
  ajax({
    url: prefix+'/manage/auto/guess/stop',
    info: '',
    success:function(result){
      alert('成功');
      checkguess();
    },
    error: function(result) {
      alert('失败');
      checkguess();
    }
  });
}

checkuser();
checkguess();