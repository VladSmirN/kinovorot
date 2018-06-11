
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var schemaFilm = new  Schema ({
	name : {
		
	  type:String,
	  required : true
	  
	} ,
	
    ratingKinopoisk:{
		
	  type:	Number
	  
	} ,
	ratingImdb:{
		
	  type:	Number
	  
	} ,
    year:{
		
	  type:	Number
	  
	} ,
	country :{
		
	  type :String 	
	  
	} ,
	director :{
		
	  type :String 	
	  
	} ,
	actor :{
		
	  type: [String]
	  
	},
	about :{
		
	  type :String 	
	  
	},
	imageSrc :{
		
	  type :String 	
	  
	},
	genre :{
		
	  type :String 	
	  
	}
})

mongoose.model('film',schemaFilm);
 //console.log   (phraser["sname"]);  