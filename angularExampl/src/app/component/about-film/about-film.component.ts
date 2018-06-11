import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { usersService } from '../../users.service';
@Component({
  selector: 'app-about-film',
  templateUrl: './about-film.component.html',
  styleUrls: ['./about-film.component.css']
})
export class AboutFilmComponent implements OnInit {
  id;
  aboutFilm:any;
  showLoad = 1;
 
  private subscription: Subscription;
  constructor(private activateRoute: ActivatedRoute , private usersService : usersService){
         
        this.subscription = activateRoute.params.subscribe(params=>this.id = params['id']);
  }
  
  
  ngOnInit() { 
     window.scrollTo(0, -1000);
    this.usersService.getFilm(this.id).subscribe(film =>{
	  
	 
	  this.aboutFilm = film[0];
	  this.aboutFilm.imageSrc  ="assets/images/"+this.aboutFilm.imageSrc+".jpg";
	  //this.aboutFilm.imageSrc  ="../../../assets/images/"+this.aboutFilm.imageSrc+".jpg";
	
	  this.showLoad = 0;
	
	}); 
  
  }
 
}
