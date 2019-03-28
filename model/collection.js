var database = require('./database');
var userSchema = require('./schema/user');
var managerSchema = require('./schema/manager');
var questionSchema = require('./schema/question');
var guessSchema = require('./schema/guess');
var codeSchema = require('./schema/code');
var contentSchema = require('./schema/content');
var awardSchema = require('./schema/award');
var corworkSchema = require('./schema/corwork');
var contactSchema = require('./schema/contact');

var user = userSchema.user;
var manager = managerSchema.manager;
var question = questionSchema.question;
var firsttype = questionSchema.firsttype;
var secondtype = questionSchema.secondtype;
var thirdtype = questionSchema.thirdtype;
var guess = guessSchema.guess;
var code = codeSchema.code;
var content = contentSchema.content;
var award = awardSchema.award;
var corwork = corworkSchema.corwork;
var contact = contactSchema.contact;

var userModel = database.mongoose.model('user',user);
var managerModel = database.mongoose.model('manager',manager);
var questionModel = database.mongoose.model('question',question);
var firsttypeModel = database.mongoose.model('firsttype',firsttype);
var secondtypeModel = database.mongoose.model('secondtype',secondtype);
var thirdtypeModel = database.mongoose.model('thirdtype',thirdtype);
var guessModel = database.mongoose.model('guess',guess);
var codeModel = database.mongoose.model('code',code);
var contentModel = database.mongoose.model('content',content);
var awardModel = database.mongoose.model('award', award);
var corworkModel = database.mongoose.model('corwork', corwork);
var contactModel = database.mongoose.model('contact', contact);

var collection = {
	user: userModel,
	manager: managerModel,
	question: questionModel,
	firsttype: firsttypeModel,
	secondtype: secondtypeModel,
	thirdtype: thirdtypeModel,
	guess: guessModel,
	code: codeModel,
	content: contentModel,
	award: awardModel,
	corwork: corworkModel,
	contact: contactModel,
}

module.exports = collection;