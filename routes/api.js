'use strict'
var express = require('express');
var router = express.Router();
var collection = require('../model/collection');
var utils = require('./utils');

/* api listing. */

//user api
//用户登录
router.post('/login', function(req, res, next) {
	var body = utils.parsebody(req.body);
  utils.search('user', body.user, function(users){
  	if (users.length == 1) {
      utils.search('award', {}, function(result1){
        var dayaward = result1.find((v) => (v.num == 2));
        var monthaward = result1.find((v) => (v.num == 3));
        //每日登录奖励
        if (dayaward) {
          if(new Date(users[0].update_at) < new Date(new Date().toLocaleDateString())) {
            users[0].point += dayaward.point * dayaward.bouns;
            users[0].coin += dayaward.coin * dayaward.bouns;
            users[0].logindays += 1;
          }
        }

        //每月份登录奖励
        if (monthaward) {
          if(new Date(users[0].update_at).getMonth != new Date().getMonth()) {
            if (new Date(users[0].update_at).getMonth == 1) {
              if (users[0].logindays == 28) {
                users[0].point += monthaward.point * monthaward.bouns;
                users[0].coin += monthaward.coin * monthaward.bouns;
                users[0].logindays = 0;
              }
            } else {
              if (users[0].logindays == 30) {
                users[0].point += monthaward.point * monthaward.bouns;
                users[0].coin += monthaward.coin * monthaward.bouns;
                users[0].logindays = 0;
              }
            }
          }
        }
        
        //登录流程
        users[0].update_at = Date.now();
        utils.change('user', users[0]._id, users[0], function() {
          res.json(users[0]);
        }, res);
      },res);
  	} else {
  		res.json({msg:'登录失败'}, 500);
  	}
  }, res);
});

//用户注册
router.post('/user', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('user', {cell: body.user.cell}, function(users){
    if(users.length > 0){
      res.json({msg:'电话号码已存在'}, 500);
      return;
    }
    if (body.user.code) {
      utils.search('code', {code: body.user.code}, function(codes){
        if (codes.length == 0) {
          res.json({msg:'激活码错误'}, 500);
          return ;
        } else {
            //激活码删除
            utils.remove('code', codes[0]._id, function(result){
              utils.sort('user', {}, function(sortuser){
                body.user.num = sortuser[0].num+1;
                utils.search('award', {num: 1}, function(result1){
                  //注册奖励
                  if (result1.length == 1) {
                    body.user.point = result1[0].point * result1[0].bouns;
                    body.user.coin = result1[0].coin * result1[0].bouns;
                  }
                  //实际注册过程
                  utils.add('user', body.user, function(result2){
                    res.json(body.user);
                  }, res);
                },res);
              }, res);
            }, res);
        }
      }, res);
    } else {
      res.json({msg:'没有激活码暂时不能注册'}, 500);
    }
  }, res);
});

//用户注册不用激活码
router.post('/user/back', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('user', {cell: body.user.cell}, function(users){
    if(users.length > 0){
      res.json({msg:'电话号码已存在'}, 500);
      return;
    }
    utils.sort('user', {}, function(sortuser){
      body.user.num = sortuser[0].num+1;
      utils.search('award', {num: 1}, function(result1){
        //注册奖励
        if (result1.length == 1) {
          body.user.point = result1[0].point * result1[0].bouns;
          body.user.coin = result1[0].coin * result1[0].bouns;
        }
        //实际注册过程
        utils.add('user', body.user, function(result2){
          res.json(body.user);
        }, res);
      },res);
    }, res);
  }, res);
});

//竞猜二级目录
router.post('/userguess', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('guess', {unum: body.uid}, function(result){
    utils.search('question', {}, function(result1){
      let list = [];
      list = result.map((v) => {
        let one = Object.assign({}, v)._doc;
        let item =result1.find((item) => (item.num == v.qnum));
        one.item = item;
        return one;
      })
      res.json(list);
    }, res);
  }, res);
});

//竞猜主目录
//竞猜一级目录
router.post('/guessmenu', function(req, res, next) {
	var body = utils.parsebody(req.body);
	if(body.id){
		utils.search('secondtype', {firsttypenum: body.id}, function(result){
	    res.json(result);
	  }, res);
	}else{
		utils.search('firsttype', {}, function(result){
      utils.search('question', {}, function(qresult){
        result.map((v, k) => {
          v._doc.count = qresult.filter((value) => (
            (value._doc.firsttypenum == v._doc.num) && (value._doc.state == 0)
          )).length;
        })
        res.json(result);
      }, res);
	  }, res);
	}
});

//热门竞猜
router.post('/guesshot', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('question', {}, function(result){
    result = result.filter((v) => (v.state == 0)).sort((n, p) => {
      if (n.times > p.times) {
        return -1;
      } else if (n.times < p.times) {
        return 1;
      } else {
        return 0;
      }
    }).slice(0,20)
    res.json(result);
  }, res);
});

//最新竞猜
router.post('/guessnew', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('question', {}, function(result){
    result = result.filter((v) => (v.state == 0)).sort((n, p) => {
      if (new Date(n.created_at) > new Date(p.times)) {
        return 1;
      } else if (new Date(n.created_at) < new Date(p.times)) {
        return -1;
      } else {
        return 0;
      }
    }).slice(0,20)
    res.json(result);
  }, res);
});

//竞猜二级目录
router.post('/guesslist', function(req, res, next) {
	var body = utils.parsebody(req.body);
	utils.search('thirdtype', {secondtypenum: body.id}, function(result){
    res.json(result);
  }, res);
});

//三级目录
router.post('/guesslists', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.search('question', {thirdtypenum: body.id}, function(result){
    result = result.filter((v) => (v.state == 0))
    res.json(result);
  }, res);
});

//竞猜详情页接口
router.post('/guessdetail', function(req, res, next) {
	var body = utils.parsebody(req.body);
	utils.search('question', {num: body.id}, function(result){
    res.json(result);
  }, res);
});

//竞猜接口
router.post('/guess', function(req, res, next) {
	var body = utils.parsebody(req.body);
	utils.sort('guess', {}, function(allguess){
    body.num = allguess[0].num+1;
    utils.search('user', {num: body.unum}, function(users){
      if (users.length == 1) {
        utils.search('question', {num: body.qnum, state: 0}, function(questions){
          if (questions.length == 1) {
            let user = users[0];
            let question = questions[0];
            let need = body.pit * body.perpoint;
            if (user.point >= need) {
              let unicode = new Date(Date.now()+8*1000*60*60).toISOString().split('T')[0].replace(/-/g,'');
              function fixnum(num) {
                let str = num + '';
                if (str.length <2) {
                  str = '0'+str;
                } else {
                  str = str.substr(0,2);
                }
                return str;
              }
              unicode = unicode + fixnum(question.secondtypenum) + fixnum(question.firsttypenum) + fixnum(question.thirdtypenum);

              user.point -= need;
              user.guess.push(body.pointid);

              question.totalpoint += need;
              question.times += +body.pit;
              if (!question.optionpoint[body.optionid]){
                question.optionpoint[body.optionid] = 0;
              }
              question.optionpoint[body.optionid] += need;
              if (!question.optionpeople[body.optionid]){
                question.optionpeople[body.optionid] = 0;
              }
              question.optionpeople[body.optionid]++;
              utils.change('user', user._id, user, function() {}, res);
              utils.change('question', question._id, question, function() {}, res);
              body.unicode = unicode;
              utils.add('guess', body, function(result){
                res.json({});
              }, res);
            } else {
              res.json({msg:'点数不够'}, 500);
            }
          } else {
            res.json({msg:'获取问题信息有误'}, 500);
          }
        }, res);
      } else {
        res.json({msg:'用户登录信息有误'}, 500);
      }
    }, res);
  }, res);
});

//个人资料接口

//排行榜接口
router.post('/rank', function(req, res, next) {
  collection.user.find({}).sort('-coin').limit('10').exec(function(err, coinrank) {
    if (err) {
      res.json(err,500);
    } else {
      collection.user.find({}).sort('-rate').limit('10').exec(function(err, raterank) {
        if (err) {
          res.json(err,500);
        } else {
          res.json({
            coinrank: coinrank,
            raterank: raterank
          });
        }
      });
    }
  });
});

//添加联系内容
router.post('/contact/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.search('contact', {}, function(contact){
    body.contact.num = utils.getnum(contact);
    utils.add('contact', body.contact, function(result){
      res.json({});
    }, res);
  }, res);
});

//添加商务合作内容
router.post('/corwork/add', function(req, res, next) {
  var body = utils.parsebody(req.body)
  utils.search('corwork', {}, function(corwork){
    body.corwork.num = utils.getnum(corwork);
    utils.add('corwork', body.corwork, function(result){
      res.json({});
    }, res);
  }, res);
});


//首页内容和购物页内容获取
router.post('/content', function(req, res, next) {
  utils.search('content', {}, function(result){
    res.json(result);
  }, res);
});

module.exports = router;
