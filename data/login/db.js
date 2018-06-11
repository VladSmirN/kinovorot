//https://docs.mongodb.com/manual/reference/method/db.collection.find/
var mongoose = require('mongoose');

require('./modelLogin.js');

const loginModel = mongoose.model('login');
 
//var log  = new loginModel({lvl:"B",pas:"12345"});
//log.save();
//for testing 

exports.getLogin = function (lvl_ ,pas_) {

  return loginModel.find({lvl:lvl_, pas:pas_});
    
 
}


	
	
