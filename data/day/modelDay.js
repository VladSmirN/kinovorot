
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaDay = new  Schema ({
	movieSet : {
		
	  
	  type: [{
			id: {
				type: String,
			},
			series: Number,
			season :Number
	  }]
	  
	} ,
	date: {
		
	  type:Date,
	  required : true
	  
	} 
   
})

mongoose.model('day',schemaDay);
