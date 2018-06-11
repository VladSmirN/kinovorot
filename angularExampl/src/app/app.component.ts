import { Component } from '@angular/core';
import { usersService } from './users.service';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  providers: [usersService]
})
export class AppComponent {
 
  /*users:any = [];
  error:String = '';
  minDay:number = 0;
  maxDay:number = 1;
  constructor(private usersService : usersService){}
   onClick(){
	   console.log("click");
	  
		this.maxDay+=1;
		
         this.usersService.getUsers(this.maxDay-1,this.maxDay).subscribe(users =>{
       
	 if(!users)
		  this.error = "Серии  в  данном   промежутке  времени  не  были найдены ";
	  else
		 this.users = this.users.concat(users); 
      console.log(users);
    });
	  
	   
   }
  ngOnInit(){
    //console.log(this.dayBegin.toString(2);)
    this.usersService.getUsers(this.minDay,this.maxDay).subscribe(users =>{
      
	  if(!users)
		  this.error = "Серии  в  данном   промежутке  времени  не  были найдены ";
	  else
		  this.users = users;
      console.log(users);
    });
  }*/
}
