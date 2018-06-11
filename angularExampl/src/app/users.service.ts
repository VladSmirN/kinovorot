import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable,Subject } from "rxjs/Rx"


@Injectable()
export class usersService {
  Scroll=0;
  beginDay=0;
  endDay=0;
  filmsFilterParametr:any={
	  
	 ratingKinopoisk:[ 0, 10 ], 
	 ratingImdb:[ 0, 10 ]

  }
  usersMas :any = [];
  length = 0;
 
  observableLength = new Subject ();
  observableUsersMas = new Subject (); 
 
  
  constructor(private http:  HttpClient){} 
  saveFilmParametr(newParametr){
	  
	 this.filmsFilterParametr = newParametr;
	  
  }
  getFilm(id){
	 let params = new HttpParams()
	    .set('id', id); 
	 return this.http.get('./api/film', { params: params }).take(1)
  }
  
  getUsers(newDay) {
    

 
       
      let params = new HttpParams()
	  
	    .set('min', (this.endDay-newDay).toString())
	    .set('max', this.endDay.toString());
	 this.http.get('./api/HW', { params: params }).take(1).subscribe(
	   
	   (film:any  = [])   => {
 
		  if(film){
			  
			 film = film.sort((n1,n2)=> {
	           if(n1.mounth*40+n1.day> n2.mounth*40+n2.day) 
		         return 1 ;
		        else
			     return -1;  
		       }); 
			  
			this.usersMas= this.usersMas.concat(film) ; 
					
			this.length++;
			this.observableLength.next(this.length);
		  }
		  this.observableUsersMas.next(film);	
	  })
	
  } 
  getUsersBegin() {
	  
	  this.observableUsersMas.next(this.usersMas);
	  
  }
  changeDay(newBeginDay , newEndDay){
	  
    this.beginDay += newBeginDay;
	this.endDay +=   newEndDay;
	
  }	

  ngOnInit(){
	
	    

   }  
} 


