
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaDay = new  Schema ({
	  
	  lvl: String,   
      pas:String
}
   )

mongoose.model('login',schemaDay);
