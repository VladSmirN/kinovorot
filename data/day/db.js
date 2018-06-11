//https://docs.mongodb.com/manual/reference/method/db.collection.find/
var mongoose = require('mongoose');


require('./modelDay.js');

const dayModel = mongoose.model('day');
/*
function ins (d){
var date = d;
var p =[


{
    movieSet:[{id:'5aeb47d47a774d131c026737',series:11,season:1},
	          {id:'5aeb47d47a774d131c026737',series:12,season:1},
			  {id:'5aeb47d47a774d131c026737',series:12,season:1},
			  {id:'5aeb47d47a774d131c026737',series:12,season:1},
			  {id:'5aeb47d47a774d131c026737',series:12,season:1},
			  {id:'5aeb47d47a774d131c026737',series:12,season:1},
			  {id:'5aeb47d47a774d131c026737',series:12,season:1}
			  ],
			  
	date: date
 
 }
];
p.forEach(f => {var days  = new dayModel(f);
               days.save();
})

}
var dd = new Date;

ins(dd.setDate(dd.getDate()+1));
ins(dd.setDate(dd.getDate()+1));
ins(dd.setDate(dd.getDate()+1));
ins(dd.setDate(dd.getDate()+1));
ins(dd.setDate(dd.getDate()+1));
ins(dd.setDate(dd.getDate()+1));
ins(dd.setDate(dd.getDate()+1));
ins(dd.setDate(dd.getDate()+1));
*/


exports.getDay = function (min ,max) {

  return dayModel.find({date: { $gt: min, $lt: max } }).sort({date:1});
    
}
exports.getDayOne = function (date) {

  return dayModel.find({date:date });
    
}


exports.saveDay = function (date) {
  
  var days  = new dayModel({
	                movieSet:[],
	                date:date
	              });
  return  days.save();
  
}

exports.updateDay = function (date,data) {
  
 return dayModel.update( { date: date } , { $push: { movieSet: data } } ) ;

}	
exports.deleteFilmsInDay = function (id) {
  
  
 
  return  dayModel.update( { }, { $pull: { movieSet: { id: id } } } ,{ multi: true });

 
}	

exports.deleteVoidDay = function () {
  

  return  dayModel.remove({movieSet : {$size: 0}});
 
}	



