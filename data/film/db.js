//https://docs.mongodb.com/manual/reference/method/db.collection.find/
var mongoose = require('mongoose');


require('./modelFilm.js');

const filmModel = mongoose.model('film');

/*
function ins (year_){
var p =[


{name: 'The Shawshank Redemption',
 about : 'Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit.',
 year: year_,
 ratingKinopoisk:9.5,
 ratingImdb:9.5,
 country:'USA',
 director :'Frank Darabont',
 actor:[ 'Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
 imageSrc:'TheShawshanksRedemption'
 
 }
];
p.forEach(f => {var films  = new filmModel(f);
               films.save();
})

}

ins(2007);
ins(2012);
ins(1997);
ins(2013);
*/


exports.getFilms = function (id) {
	
  return filmModel.find({ _id:id });
  
}
exports.getFilmsName = function (name) {
	
  return filmModel.find({name:name });
  
}
exports.getFilmsNameYear = function (name,year) {
	
  return filmModel.find({ name:name ,year : year });
  
}
exports.saveFilm = function (d) {
	
  var films  = new filmModel(d);
  
  return films.save();
  
}
exports.deleteFilm = function (id) {
 
   return   filmModel.remove({_id :id});

}	
	
	
exports.deletSameFilms = function (name , year,country) {
	
	 var p =0;

	 if(!year) p++;
	 
	 if(!country) p++;	
 
	switch(p){
	  case 2 :  filmModel.find({name: name })
       .then(d =>{ delFilm(d);});
	  break;
	  
	  case 1 :  filmModel.find({name: name , year :year})
       .then(d =>{delFilm(d);});
	  break;
	  
	  case 0 :  filmModel.find({name: name ,year :year,  country: country})
       .then(d =>{delFilm(d);});
	  break;
	  
	}	 function delFilm (d) {
		
       var size = d.length;
       d.forEach(p => {
		
		if(size-- >1)
			filmModel.find({_id : p._id})
		.remove()
		.then(() => console.log("delte film :" + name +" year:" +year))
		
	   })
		
	 }


   
}

