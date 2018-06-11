
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaDay = new  Schema ({
	id : {
		
	  type:String,
	  required : true
	  
	} ,
	data: {
		
	  type:Date,
	  required : true
	  
	} 
   
})

mongoose.model('day',schemaDay);
