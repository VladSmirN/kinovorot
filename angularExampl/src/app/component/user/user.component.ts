import { Component,Input } from '@angular/core';
import { usersService } from '../../users.service';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html', 
  styleUrls: ['./user.component.css']

})
export class UserComponent {

  @Input()films; 
    //console.log("asdas");
imageSrc:String;
 constructor(private usersService : usersService){}
     saveScroll(){
		 
		this.usersService.Scroll=pageYOffset;  
		 
	 }
     
	 ngOnInit(){
		
	  this.imageSrc ="assets/images/"+this.films.imageSrc+".jpg";
	    //this.imageSrc ="../../../assets/images/"+this.films.imageSrc+".jpg";

	
	 }
	
	
} 