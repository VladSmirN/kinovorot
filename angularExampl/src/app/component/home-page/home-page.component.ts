import { Component } from '@angular/core';
import { usersService } from '../../users.service';
import { Subject } from "rxjs/Rx"
 
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
 
})
export class HomePageComponent {
 
  users:any = [];
  error:String = 'films not found';
  showLoad=1;
  showError=0;
  constructor(private usersService : usersService){}
   onClick(){
	 
	  this.usersService.changeDay(0,3);
	  this.usersService.getUsers(3);
	  
   }
   
   
  ngOnInit(){
	  
   
   this.usersService.observableLength.take(1).subscribe(n =>{
		 
		if(n>0)this.showLoad=0; 
		 
	 })
	 this.usersService.observableUsersMas.subscribe(n =>{
		 
		
		if(n){
		  if(this.users.length==0)	
			  setTimeout(()=>{window.scrollTo(0,-1000)} ,50);
		  this.users= this.users.concat(n);
	    }
		else  
		  this.showError = 1;
		
 		
	 })
	
	 if( !this.usersService.length){
	
	
	   this.usersService.changeDay(0,2);
	   this.usersService.getUsers(3);
	   
	 } else {
		
	   this.usersService.getUsersBegin();
	   this.showLoad = 0; 
	
       setTimeout(()=>{window.scrollTo(0, this.usersService.Scroll);} ,50)
		   
	   
	 }
  }
}