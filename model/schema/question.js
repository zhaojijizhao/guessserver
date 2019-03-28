var database = require('../database');

//一级分类
var firsttype = new database.Schema({
  num:{
    type:Number,
    validate:/.+/
  },
  name:{
    type:String,
    validate:/.+/
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});

//二级分类
var secondtype = new database.Schema({
  num:{
    type:Number,
    validate:/.+/
  },
  firsttypenum:{
    type:Number,
    validate:/.+/
  },
  name:{
    type:String,
    validate:/.+/
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});

//三级分类
var thirdtype = new database.Schema({
  num:{
    type:Number,
    validate:/.+/
  },
  firsttypenum:{
    type: Number,
    validate:/.+/
  },
  secondtypenum:{
    type: Number,
    validate:/.+/
  },
  name:{
    type:String,
    validate:/.+/
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});

//题目信息
var question = new database.Schema({
  num:{
    type:String,
    validate:/.+/
  },
  qid:{
    type:String,
    validate:/.+/
  },
  firsttypenum:{
    type:Number,
    validate:/.+/
  },
  secondtypenum:{
    type:Number,
    validate:/.+/
  },
  thirdtypenum:{
    type:Number,
    validate:/.+/
  },
  name: {
    type:String,
    validation:/.+/
  },
  roundlist: [
    {
      round: {
        type:Number,
        validation:/.+/
      },
      pit: {
        type:Number,
        validation:/.+/
      }
    }
  ],
  round: {
    type:Number,
    validation:/.+/
  },
  date: {
    type:Date,
    validation:/.+/
  },
  perpoint: {
    type:Number,
    validation:/.+/
  },
  times: {
    type:Number,
    validation:/.+/,
    default: 0
  },
  totalpoint: {
    type:Number,
    validation:/.+/,
    default: 0
  },
  awardpoint: {
    type: Number,
    validation: /.+/,
    default: 0
  },
  awardtype: {
    type: Number,
    validation: /.+/,
    default: 0
  },
  awardmode: {
    type: Number,
    validation: /.+/,
    default: 0
  },
  state: {
    type:Number,
    validation:/.+/,
    default: 0
  },
  intro: {
    type:String,
    validation:/.+/
  },
  final: {
    type:Number,
  },
  recent: {
    type:String,
  },
  question: {
    type:String,
    validation:/.+/
  },
  options: [String],
  optiontips: [String],
  optionpoint: [
    {
      type:Number,
      validation:/.+/,
      default: 0
    }
  ],
  optionpeople: [
    {
      type:Number,
      validation:/.+/,
      default: 0
    }
  ],
  created_at:{
    type:Date,
    default: Date.now
  }
});

var questionSchema = {
  firsttype: firsttype,
  secondtype: secondtype,
  thirdtype: thirdtype,
  question: question
};

module.exports = questionSchema;