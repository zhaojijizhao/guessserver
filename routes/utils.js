var collection = require('../model/collection');

//增删改查
function add(type, content, callback, res){
  var model = new collection[type](content);
  model.save(function(err){
    if(err){
      res.json(err,500);
    }else{
      if(callback){
        callback(model);
      }
    }
  });
}
function remove(type, id, callback, res){
  collection[type].findById(id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        data.remove(function(err){
          if(err){
            res.json(err,500);
          }else{
            if(callback){
              callback();
            }
          }
        });
      }
    }
  );
}
function change(type, id, content, callback,res){
  collection[type].findById(id, function(err,data){
    if(err){
      res.json(err,500);
    }else{
      data.set(content);
      data.save(function(err){
        if(err){
          try {
            res.json(err,500);
          } catch (err) {
            console.log("error");
          }
        }else{
          if(callback){
            callback();
          }
        }
      });
    }
  });
}

function searchpage(type, param, callback, res){
  const { limit, skip } = param;
  delete param.limit;
  delete param.skip;
  collection[type].count({}, function(err, count) {
    collection[type].find(param).sort({'created_at': 1}).limit(limit).skip(skip).exec(function(err,data){
        if(err){
          res.json(err,500);
        }else{
          if(callback){
            callback(data, count);
          }
        }
      }
    );
  });
}

function searchpagebydate(type, param, callback, res){
  const { limit, skip } = param;
  delete param.limit;
  delete param.skip;
  collection[type].count({}, function(err, count) {
    collection[type].find(param).sort({date: 1}).limit(limit).skip(skip).exec(function(err,data){
        if(err){
          res.json(err,500);
        }else{
          if(callback){
            callback(data, count);
          }
        }
      }
    );
  });
}

function search(type, param, callback, res){
  collection[type].find(param,function(err,data){
      if(err){
        res.json(err,500);
      }else{
        if(callback){
          callback(data);
        }
      }
    }
  );
}

function sort(type, param, callback, res){
  collection[type].find({}).sort({'_id': -1}).limit(1).exec(function(err,data){
      if(err){
        res.json(err,500);
      }else{
        if(callback){
          callback(data);
        }
      }
    }
  );
}

//parsebody
function parsebody(body){
  for(var key in body){
    body[key] = JSON.parse(body[key]);
  }
  return body;
}

//自动运算num
function getnum(content){
  var arr = content.map(function(v, k) {
    return v.num || 0;
  });
  arr.push(0);
  var result = 0;
  arr.map((v, k) => {
    if(+v>result) {
      result = +v;
    }
  })
  result++;
  return result;
}

//自动运算生成问题id
function getqid(item) {
  var result = "";
  let { firsttypenum, secondtypenum, thirdtypenum, num } = item;
  result += (firsttypenum > 9 ? firsttypenum : ('0'+firsttypenum));
  result += (secondtypenum > 9 ? secondtypenum : ('0'+secondtypenum));
  result += (thirdtypenum > 9 ? thirdtypenum : ('0'+thirdtypenum));
  result += new Date(Date.now() + 1000*60*60*8).toISOString().split('T')[0].split('-').join('');
  result += '0'.repeat(4-(''+num).length) + num;
  return result;
}

//生成cookie
//发送短信
//自动运算num

var utils = {
  add: add,
  remove: remove,
  change: change,
  search: search,
  sort: sort,
  parsebody: parsebody,
  getnum: getnum,
  getqid: getqid,
  searchpage: searchpage,
  searchpagebydate: searchpagebydate
}

module.exports = utils;