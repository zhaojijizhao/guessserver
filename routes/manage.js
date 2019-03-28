'use strict'
var express = require('express');
var _ = require('lodash');
var router = express.Router();
var collection = require('../model/collection');
var utils = require('./utils');
var spawn = require('child_process').spawn;
var path=require('path');

/* manage listing. */

//管理员登录
router.post('/manager/login', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('manager', {name: body.name, psw: body.psw}, function(result){
    if(result.length != 1) {
      res.json({msg: '登录失败'}, 500);
      return ;
    } else {
      res.json(result);
    }
  }, res);
});


//管理员搜索
router.post('/manager', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.searchpage('manager', {limit: body.limit || 10, skip: body.skip || 0}, function(result, count){
    res.json({list:result, count: count});
  }, res);
});

//管理员新增
router.post('/manager/add', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('manager', {}, function(managers){
    body.manager.num = utils.getnum(managers);
    utils.add('manager', body.manager, function(result){
      res.json({});
    }, res);
  }, res);
});

//管理员删除
router.post('/manager/remove', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.remove('manager', body.manager._id, function(result){
    res.json({});
  }, res);
});

//管理员修改
router.post('/manager/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('manager', body.manager._id, body.manager, function(result){
    res.json({});
  }, res);
});

//用户搜索
router.get('/users', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('user', {}, function(result, count){
    res.json({list:result, count: count});
  }, res);
});

//用户搜索
router.post('/user', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.searchpage('user', {limit: body.limit || 10, skip: body.skip || 0}, function(result, count){
    res.json({list:result, count: count});
  }, res);
});

//用户新增
router.post('/user/add', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('user', {cell: body.user.cell}, function(users){
    if(users.length > 0){
      res.json({msg:'电话号码已存在'}, 500);
      return;
    }
    utils.sort('user', {}, function(sortuser){
      body.user.num = +sortuser[0].num+1;
      utils.add('user', body.user, function(result){
        res.json({});
      }, res);
    }, res);
  }, res);
});

//用户删除
router.post('/user/remove', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.remove('user', body.user._id, function(result){
    res.json({});
  }, res);
});

//用户修改
router.post('/user/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('user', body.user._id, body.user, function(result){
    res.json({});
  }, res);
});

//一级类型搜索
router.post('/firsttype', function(req, res, next) {
  utils.search('firsttype', {}, function(result){
    res.json(result);
  }, res);
});

//一级类型新增
router.post('/firsttype/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.search('firsttype', {}, function(firsttypes){
    body.firsttype.num = utils.getnum(firsttypes);
    utils.add('firsttype', body.firsttype, function(result){
      res.json({});
    }, res);
  }, res);
});

//一级类型删除
router.post('/firsttype/remove', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.remove('firsttype', body.firsttype._id, function(result){
    res.json({});
  }, res);
});

//一级类型修改
router.post('/firsttype/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('firsttype', body.firsttype._id, body.firsttype, function(result){
    res.json({});
  }, res);
});

//二级类型搜索
router.post('/secondtype', function(req, res, next) {
  utils.search('secondtype', {}, function(result){
    res.json(result);
  }, res);
});

//二级类型新增
router.post('/secondtype/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.search('secondtype', {}, function(secondtypes){
    body.secondtype.num = utils.getnum(secondtypes);
    utils.add('secondtype', body.secondtype, function(result){
      res.json({});
    }, res);
  }, res);
});

//二级类型删除
router.post('/secondtype/remove', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.remove('secondtype', body.secondtype._id, function(result){
    res.json({});
  }, res);
});

//二级类型修改
router.post('/secondtype/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('secondtype', body.secondtype._id, body.secondtype, function(result){
    res.json({});
  }, res);
});

//三级类型搜索
router.post('/thirdtype', function(req, res, next) {
  utils.search('thirdtype', {}, function(result){
    res.json(result);
  }, res);
});

//三级类型新增
router.post('/thirdtype/add', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('thirdtype', {}, function(thirdtypes){
    body.thirdtype.num = utils.getnum(thirdtypes);
    utils.add('thirdtype', body.thirdtype, function(result){
      res.json({result});
    }, res);
  }, res);
});

//三级类型删除
router.post('/thirdtype/remove', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.remove('thirdtype', body.thirdtype._id, function(result){
    res.json({});
  }, res);
});

//三级类型修改
router.post('/thirdtype/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('thirdtype', body.thirdtype._id, body.thirdtype, function(result){
    res.json({});
  }, res);
});


//问题类型搜索
router.post('/questions', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.searchpage('question', {}, function(result, count){
    res.json({list:result, count: count});
  }, res);
});


//问题类型搜索
router.post('/question', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.searchpage('question', {limit: body.limit || 10, skip: body.skip || 0}, function(result, count){
    res.json({list:result, count: count});
  }, res);
});

//问题类型新增
router.post('/question/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.sort('question', {}, function(questions){
    body.question.num = +questions[0].num+1;
    body.question.qid = utils.getqid(body.question);
    utils.add('question', body.question, function(result){
      res.json({});
    }, res);
  }, res);
});

//问题类型删除
router.post('/question/remove', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.remove('question', body.question._id, function(result){
    res.json({});
  }, res);
});

//问题类型修改
router.post('/question/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('question', body.question._id, body.question, function(result){
    res.json({});
  }, res);
});

//问题状态
router.post('/question/calt', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('guess', {qnum: body.question.num}, function(result){
    //奖励点数处理
    //指定奖励人群
    //awardtype 0游戏点数 1消费点数 2消费额度
    //awardmode 0全部人员平分 1全部人员抽出指定人员平分 2全部猜中人员平分 3全部猜中人员抽出指定人平分
    var awardresult = Object.assign([],result); 
    var userlist = [];
    if (body.question.awardmode == 0) {
      awardresult.map((v, k) => {
        if (userlist.indexOf(v.unum) == -1) {
          userlist.push(v.unum);
        }
      });
    } else if (body.question.awardmode == 2) {
      awardresult.map((v, k) => {
        if (userlist.indexOf(v.unum) == -1 && v.optionid == body.question.final) {
          userlist.push(v.unum);
        }
      });
    }
    
    if(body.question.awardpoint > 0 && userlist.length > 0) {
      var j = 0;
      var awardpointper = Math.floor(body.question.awardpoint/userlist.length);
      if (awardpointper > 0) {
        function award() {
          utils.search('user', {num: userlist[j]}, function(users){
            let user = users[0];

            if (body.question.awardtype == 0) {
              user.point += awardpointper;
            } else if (body.question.awardtype == 1) {
              user.coin += awardpointper;
            } else if (body.question.awardtype == 2) {
              user.limit += awardpointper;
            }
            
            utils.change('user', user._id, user, function() {
              if (j < userlist.length - 1) {
                j++;
                award();
              }
            }, res);
          }, res);
        }
        award();
      }
    } 
    
    //普通游戏点数目前采用均分策略 
    result = result.filter((v, k) => {
      return v.optionid == body.question.final;
    })
    let totalTimes = 0;
    result.map((v, k) => {
      totalTimes += v.pit;
    });
    var eachpit = Math.floor(body.question.totalpoint/totalTimes);
    //给用户打入点数
    if (result.length > 0) {
      let i = 0;
      function change() {
        utils.search('guess', {num: result[i].num}, function(thisguess){
          if (thisguess.length > 0) {
            thisguess[0].final = body.question.final;
            utils.change('guess', thisguess[0]._id, thisguess[0], function() {
              utils.search('user', {num: result[i].unum}, function(users){
                let user = users[0];
                user.point += eachpit * result[i].pit;
                utils.change('user', user._id, user, function() {
                  if (i < result.length - 1) {
                    i++;
                    change();
                  }
                }, res);
              }, res);
            }, res);
          }
        });
      }
      change();
      body.question.state = 2;
      utils.change('question', body.question._id, body.question, function(result){
        res.json({});
      }, res);
    }
  }, res);
});

//竞猜条目搜索
router.post('/guess', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.searchpage('guess', body, function(result, count){
    res.json({list:result, count: count});
  }, res);
});

//竞猜条目新增
router.post('/guess/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.sort('guess', {}, function(guesss){
    body.guess.num = +guesss[0].num+1;
    utils.add('guess', body.guess, function(result){
      res.json({});
    }, res);
  }, res);
});

//竞猜条目删除
router.post('/guess/remove', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.remove('guess', body.guess._id, function(result){
    res.json({});
  }, res);
});

//竞猜条目修改
router.post('/guess/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('guess', body.guess._id, body.guess, function(result){
    res.json({});
  }, res);
});


//展示内容搜索
router.post('/content', function(req, res, next) {
  utils.search('content', {}, function(result){
    res.json(result);
  }, res);
});

//展示内容新增
router.post('/content/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.add('content', body.content, function(result){
    res.json({});
  }, res);
});

//展示内容修改
router.post('/content/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('content', body.content._id, body.content, function(result){
    res.json({});
  }, res);
});

//联系信息搜索
router.post('/contact', function(req, res, next) {
  utils.search('contact', {}, function(result){
    res.json(result);
  }, res);
});

//商务合作搜索
router.post('/corwork', function(req, res, next) {
  utils.search('corwork', {}, function(result){
    res.json(result);
  }, res);
});

//奖励配置搜索
router.post('/award', function(req, res, next) {
  utils.search('award', {}, function(result){
    res.json(result);
  }, res);
});

//奖励配置新增
router.post('/award/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.search('award', {}, function(award){
    body.award.num = utils.getnum(award);
    utils.add('award', body.award, function(result){
      res.json({});
    }, res);
  }, res);
});

//奖励配置修改
router.post('/award/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('award', body.award._id, body.award, function(result){
    res.json({});
  }, res);
});

//激活码列表
router.post('/code', function(req, res, next) {
  utils.search('code', {}, function(result){
    result.sort((n, p) => {
      if(n>p) {
        return 1;
      } else if (n<p) {
        return -1;
      } else {
        return 0;
      }
    })
    res.json(result);
  }, res);
});

//激活码新增
router.post('/code/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.search('code', {}, function(code){
    body.code.num = utils.getnum(code);
    utils.add('code', body.code, function(result){
      res.json({});
    }, res);
  }, res);
});

//激活码删除
router.post('/code/remove', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.remove('code', body.code._id, function(result){
    res.json({});
  }, res);
});

//激活码修改
router.post('/code/change', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.change('code', body.code._id, body.code, function(result){
    res.json({});
  }, res);
});

//生成激活码
router.post('/code/creat', function(req, res, next) {
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
  var newcode = {
    code: getrandomstr(6)
  }

  utils.search('code', {}, function(code){
    newcode.num = utils.getnum(code);
    utils.add('code', newcode, function(result){
      res.json({});
    }, res);
  }, res);
});

//定时任务
//任务1 10分钟，查找一次是否有题目需要切换状态
setInterval(() => {
  utils.search('question', {state: 0}, function(questions){
    if (questions.length > 0) {
      questions.map((v, k) => {
        if (v.date < Date.now()) {
          v.state = 1;
          utils.change('question', v._id, v, function(result){
          });
        }
      });
    }
  });
}, 1000 * 60 * 10);

var userjs;
var guessjs;

router.post('/auto/user', function(req, res, next) {
  res.json({has: !!userjs});
});


router.post('/auto/user/start', function(req, res, next) {
  if (!userjs) {
    userjs = spawn('node', ['./auto/user']);
    console.log(userjs)

    userjs.stdout.on('data', function (data){
      console.log((data||'').toString());
    });

    userjs.stderr.on('data', function (error){
      console.log((error||'').toString());
    });

    userjs.on('close', function (signal){
      console.log((signal||'').toString());
    });

    res.json({});
  } else {
    res.json({}, 500);
  }
});

router.post('/auto/user/stop', function(req, res, next) {
  if (userjs) {
    userjs.kill();
    userjs = null;
    res.json({});
  } else {
    res.json({}, 500);
  }
});

router.post('/auto/guess', function(req, res, next) {
  res.json({has: !!guessjs});
});

router.post('/auto/guess/start', function(req, res, next) {
  if (!guessjs) {
    guessjs = spawn('node', ['./auto/guess']);

    guessjs.stdout.on('data', function (data){
      console.log((data||'').toString());
    });

    guessjs.stderr.on('data', function (error){
      console.log((error||'').toString());
    });

    guessjs.on('close', function (signal){
      console.log((signal||'').toString());
    });

    res.json({});
  } else {
    res.json({}, 500);
  }
});

router.post('/auto/guess/stop', function(req, res, next) {
  if (guessjs) {
    guessjs.kill();
    guessjs = null;
    res.json({});
  } else {
    res.json({}, 500);
  }
});

module.exports = router;