//https://docs.mongodb.com/manual/reference/method/db.collection.find/
var mongoose = require('mongoose');
var config = require('../config.js');
mongoose.connect(config.database.connect)
	  .then(() => console.log(' mongoDB is works. db  connect... '))
	  .catch(e => console.log(e))


	
	
