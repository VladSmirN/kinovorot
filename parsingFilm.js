var request = require('request');
var iconv  = require('iconv-lite');
var cheerio = require("cheerio");
const Entities = require('html-entities').XmlEntities;



var aboutSeries = function (name,date,sezon,series) {
	
	this.series = series;
	this.sezon = sezon;
	this.date = date;
	this.name = name;
	
}

var ansParsingFinlm = function (series,name,genre,year,country,imdb,kinopoisk,about,urlImage) {
	
	this.series = series;
	this.name = name;
	this.genre = genre;
	this.year = year;
	this.country = country;
	this.imdb = imdb;
	this.kinopoisk = kinopoisk;
	this.about = about;
	this.urlImage = urlImage;
	
}	

var textName;
var textGenre;
var textYear;
var textCountry;
var textImdb;
var textKinopoisk;
var textAbout;
var urlImage;

var masSeries=[];
var masSeriesTrans=[];


exports.filmPars = function(s){
	
  var opt = {
	
    url: 'https://myshows.me/view/'+s+'/',
    encoding: null,
	
  }
	
  return new Promise(function(resolve, reject)  {

		//псевдо асинхронный код
		/*var ascync = true; //или  false
		if (!ascync)
		return reject(new Error("не удалось выполнить..."));*/

		
    request(opt, function (err, res, body) {
	   
    if (err) throw err;
    masSeries=[];
    console.log(res.statusCode+"(parsing)");
	
	if(res.statusCode != 200)
		return ;
	
	var $=cheerio.load(body, {decodeEntities: true});
     
		
    textGenre = $('body > div.wrapper > div > div > main > div.clear > p:nth-child(4)')
	              .text()
				  .replace( /Жанры:|\s/g, '');
				  
	textYear = $('body > div.wrapper > div > div > main > div.clear > p.flat')
	             .text()
	             .replace(/Даты|выхода:|\s/g, '');	
				 
    textCountry = $('body > div.wrapper > div > div > main > div.clear > p:nth-child(3) > a')
	                .text()
	                .replace(/\s/g, '');
					
    textName = $('body > div.wrapper > div > div > main > h1')
	             .text();
	                     				  
    textImdb = $('body > div.wrapper > div > div > main > div.clear > p:nth-child(9) > a')
	             .text();
				 
	textKinopoisk = $('body > div.wrapper > div > div > main > div.clear > p:nth-child(10) > a')
	                  .text();  
					  
    textAbout = $('body > div.wrapper > div > div > main > div:nth-child(7) > div.col5 > p:nth-child(2)')
	              .text()+
				  "  "+
				  $('body > div.wrapper > div > div > main > div:nth-child(7) > div.col5 > p:nth-child(4)')
	              .text();
				  
	urlImage = $('body > div.wrapper > div > div > main > div.clear > div > div.presentBlockImg');
		       
    if(urlImage[0].attribs.style)
      urlImage = urlImage[0].attribs.style
	    .replace(/background-image:|url|\s/g, '')
	    .slice(1, -1);  			
	else
      urlImage = null; 
       
	   
	   
	   
	var i = 3;
	var j = 1;
	
	while(1){
		 
	  if(!$("body > div.wrapper > div > div > main > form > div:nth-child("+i+") > div.col6 > div > ul > li:nth-child(1) > label").text())
	    break;
    	
	  while(1){
	
	 
        try {
 
	    date =$("body > div.wrapper > div > div > main > form > div:nth-child("+i+") > div.col6 > div > ul > li:nth-child("+j+") > label ").text(); 
		
		if(!date)
		  break; 
		
	    var seriesName= date
	                      .replace(/  |\n/g, '')
	                      .replace(/\d{2}(.)\d{2}(.)\d{4}/g, '')
                          .replace(/[0-9]/g, '');
			  
		var seriesDate = date.match(/\d{2}(.)\d{2}(.)\d{4}/g, '');
	
		
	    if( seriesDate != null ) {   
		 
	    var seriesYear =seriesDate[0].match(/\d{4}/g, '');
	    var seriesMonth =seriesDate[0].match(/\d{2}/g, '')[1];
	    var seriesaDay =seriesDate[0].match(/\d{2}/g, '')[0];
	        
		seriesDate = new Date(Number(seriesYear),Number(seriesMonth)-1,Number(seriesaDay)); 
		
	  	 }	 
		masSeriesTrans.push(new aboutSeries(seriesName,seriesDate,(i-3)/2,j));
		
		} catch (err) {

          console.log("err pars")

        } 	
		j++; 
		
		
	  }

	  for(var q = 0;q<masSeriesTrans.length;++q){
		  
			masSeriesTrans[q].series =  masSeriesTrans.length - masSeriesTrans[q].series+1;
			
	  }
		
		
	  masSeries= masSeries.concat(masSeriesTrans);
      
	  masSeriesTrans= [];
		
	  j=1;
	  i+=2;  
	
    }
	
	var maxSezon = (i-3)/2;
	
	for(var q = 0;q<masSeries.length;++q){
		
	  masSeries[q].sezon = maxSezon - masSeries[q].sezon ;
	  
	}
		
	
    return resolve( new  ansParsingFinlm (
		                    masSeries,
		                    textName,
					        textGenre,
					        textYear,
					        textCountry,
					        textImdb,
				 	        textKinopoisk,
				       	    textAbout,
					        urlImage
					     )
				  );
	});
		
  });
 
}


