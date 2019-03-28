var database = require('../database');

//管理员信息
var content = new database.Schema({
  guess: [
    {
      title: {
        type:String,
        validate:/.+/
      },
      content: [String]
    }
  ],
  shop: [
    {
      title: {
        type:String,
        validate:/.+/
      },
      content: [String]
    }
  ]
});

var contentSchema = {
  content: content
};

module.exports = contentSchema;