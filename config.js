var config = {}

config.database = {
	
  connect:process.env.MONGODB_URI

  };


config.session = {
	secret : process.env.SESSION_SECRET ,
	key : "keS",
	cookie : {
	  "path":"/",
	  "httpOnly":true,
	  "maxAge":120*60*1000 // 2ч
	}
	
};

config.captcha = {
	
	url:"https://www.google.com/recaptcha/api/siteverify",
	metgod:"POST",
	secret:  process.env.CAPTCHA_SECRET
}

config.parsing = {
	
	urlSaveImage :"../angularExampl/dist/assets/images/",
	//urlSaveImage :"../angularExampl/src/assets/images/",
	typeImage :".jpg"
	
}

config.server= {};

config.database.user = '';
config.database.password = '';
config.database.server = '';

config.server.port = 3000;
config.server.maxDay = 30;
config.server.minDay = -30;
module.exports = config;