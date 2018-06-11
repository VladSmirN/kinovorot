var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config.js');
var index = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session');
var parsing = require('./parsingFilm');
const MongoStore = require('connect-mongo')(session);
var http = require('http-https');
const asyncMap = require('async-map');
var fs = require('fs');
var request = require('request');
var app = express();

var mongoose = require('mongoose');
require ('./data/connect' ) ;
var sessionStore = new MongoStore({mongooseConnection: mongoose.connection });
var  dbFilm  = require ('./data/film/db' ) ;
var  dbDay  = require ('./data/day/db' ) ;
var  dbLogin = require ('./data/login/db' ) ;





	
var AboutFilm  = function ( id_, series_, season_, name_, imageSrc_,ratingKinopoisk_,ratingImdb_    ) {
  
  this.id = id_ ;
  this.series = series_ ;
  this.season = season_;	
  this.name = name_;
  this.imageSrc = imageSrc_;
  this.ratingKinopoisk = ratingKinopoisk_;
  this.ratingImdb = ratingImdb_;	
  
}

var AnsObject = function (day_,mounth_,week_,result_) {
	
  this.day = day_; 
  this.mounth = mounth_;
  this.week = week_;
  this.result = result_;
		
}
 

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cookieParser());


app.use(session({
	
	secret:  config.session.secret,
	key:  config.session.key,
	cookie:  config.session.cookie,
	store:  sessionStore 
	
	})

);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './angularExampl/dist')));

app.use('/newElement', function(req,res){
	
	
	res.render("login");
	
});


app.post('/login', function(req,res){
	
			 
	request({
      url: config.captcha.url,
      method:config.captcha.metgod,
    form: {

      secret: config.captcha.secret,
      response: req.body.captcha
    }
}, function(error, response, body) {

 
    body = JSON.parse(body);
	
    
    if(body.success !== undefined && !body.success) {
      res.send("0");
    } 
	if(body.success)
   dbLogin.getLogin(req.body.lvl,req.body.pas).then(f =>{
		
		if ( f.length ) {
			if(req.session.lvl != req.body.lvl)
			req.session.lvl = req.body.lvl;
			res.send("1");
		}
	else
		res.send("0");
	
	 
	});
	
  });


	
});

app.get('/lvlB', function(req,res){
	//console.log(req.session.lvl);
	if(req.session.lvl == "B" ){
		  res.render("lvlB");
	}
	else
		res.send("0");
		
	
});

app.post('/deleteElement', function(req,res){
	
	
  if(req.session.lvl == "B" ){
			
	 
	 dbFilm.getFilms(req.body.id).then(nowFilm => {
		 
		if(nowFilm.length != 0) {  
		 dbDay.deleteFilmsInDay(nowFilm[0]._id).then(d=>{
			 
			dbDay.deleteVoidDay().then(d2 =>{
				
				dbFilm.deleteFilm(nowFilm[0]._id).then(d3=>{
					
					res.send("1");
					
				});
			}) 
			 
		}) 
		}else 
			 res.send("0");
		 
	 })		
	
			
  } else
   res.send("0");	  
})




app.post('/pushElement', function(req,res){
	
	if(req.session.lvl == "B" ){

		 parsing.filmPars(req.body.id).then(f => {
			 
			 
			 
			console.log(f.urlImage);
		   	 console.log(f.name);
			 console.log(f.series);/**/
			 var nameImage;
			 var yearFilm =0;
			 
			 // определяем имя изображения 
			 
		     try {
				 
				yearFilm =  Number(f.year.match(/\d{4}/g, '')[0]); 
				nameImage = f.name.replace(/\s/g, '') + String(yearFilm);
				
			 } catch(err) {
				 
				nameImage = f.name.replace(/\s/g, '');	 
			 }	

			 
			  dbFilm.getFilmsNameYear(f.name , yearFilm).then(d =>{
				  
			    if(d.length == 0){
					
		          //добавляем  изображение в папку на сервере

					var file = fs.createWriteStream(config.parsing.urlSaveImage +nameImage+ config.parsing.typeImage);
					var request = http.get(f.urlImage, function(response) {
						 response.pipe(file);
					});	 
												
					
					//сохраним фильм  в БД
					
					dbFilm.saveFilm({ name : f.name,
                                about : f.about,
                                year: yearFilm,
                                ratingKinopoisk:f.kinopoisk,
                                ratingImdb:f.imdb,
                                country:f.country,
                                imageSrc:nameImage,
                                director :"",
								genre :f.genre,
                                actor:[]
                              }).then( saveFilm =>{
							  
							       dbFilm.getFilmsNameYear(f.name ,yearFilm).then( nowFilm =>{
							        
		
									   
									   
									   
									   
									   
									     
									    var pushSeries  =  function (nowSeries){
										   
										   
										    dbDay.getDayOne(nowSeries.date).then(existDay =>{
											 
											if(existDay.length == 0){
                                              dbDay.saveDay(nowSeries.date).then(newDay =>{
												 
												dbDay.updateDay(nowSeries.date,{ id: nowFilm[0]._id,
											                                   	season: nowSeries.sezon,
												                                series: nowSeries.series
																				
										                                       }).then(r=>{});
																			   
											
											  })
 											} else {
												if(existDay.length != 0 )
													
												dbDay.updateDay(nowSeries.date,{  id: nowFilm[0]._id,
											                                   	season: nowSeries.sezon,
												                                series: nowSeries.series
										                                       }).then(r=>{});
													
											
											}
											  return 0;
										  })
							
											  
										 
										   
										   
										}  
									  asyncMap(f.series, pushSeries, (err, series) => {console.log("12312")});
									
							
									   
									  res.send("1"); 
									   
								   })
								   
							        
							  
							  
							   }); 
											
										
				} else 
                   res.send("0") 					
				  
				  
				  
				  
			  })
			  
		 		 
		})
		
		
	}
	else
		res.send("0");
		
});




app.get('/api/film', function (req, res) {
	 res.set({
  'Access-Control-Allow-Origin': '*'
  })
  dbFilm.getFilms(req.query.id).then(  
    ans =>{res.send(ans)} 
  )
  
  
})/**/
app.get('/api/HW', function (req, res) {
	 res.set({
  'Access-Control-Allow-Origin': '*'
  })
  //console.log(req.query.min);
	var minDayNumber = Number(req.query.min);
	var maxDayNumber = Number(req.query.max);
	
	var minDay = new Date;
	minDay.setDate(minDay.getDate()+minDayNumber);
	
	var maxDay = new Date;
	maxDay.setDate(maxDay.getDate()+maxDayNumber);
	
	console.log(minDay);
	console.log(maxDay);
	
    var  day = dbDay.getDay(minDay,maxDay);
	
	if( maxDayNumber < config.server.minDay ||
	    minDayNumber < config.server.minDay ||
		maxDayNumber > config.server.maxDay || 
		minDayNumber > config.server.maxDay)
		res.send("0");
 
  var ans = [];
   
  day.then(d => {
	  
	if(d.length == 0 )
	  res.send("0");

  //  d.forEach(f => {
	var getFilmIterator = function(f){		
      var mas = [];
	  
	  
	var movieSetIterator = function(MS){	
	
	//  f.movieSet.forEach(MS => {	
		  
	    dbFilm.getFilms(MS.id).then( films => {

	      mas.push(new AboutFilm(
			
		    films[0]._id,
			MS.series,
			MS.season,
			films[0].name,
			films[0].imageSrc,
			films[0].ratingKinopoisk,
			films[0].ratingImdb
					  
		  ));	
		   
          if(f.movieSet.length <= mas.length )	{
		 
		    ans.push(new  AnsObject (f.date.getUTCDate() ,f.date.getMonth(),f.date.getDay(), mas));	
			
		  }
		  if(d.length <= ans.length)
		    res.send(ans);
								
        }).catch(err =>{console.log(err)})
		
	  } 
	  
	  asyncMap(f.movieSet, movieSetIterator, (err, series) => {}) 
	  
	 }
	 
	 
	 
	  asyncMap(d, getFilmIterator, (err, series) => {}) 
   // })
   
   
  
  })	  
})	 

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{err1: req.app.get('env') === 'development' ? err : {}, err2:err.status});
});

module.exports = app;
