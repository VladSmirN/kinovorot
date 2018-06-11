
import { NouisliderModule } from 'ng2-nouislider';
import { usersService } from '../../users.service';
import "../../../../node_modules/nouislider/distribute/nouislider.min.css";
import { ViewEncapsulation} from '@angular/core';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css',"../../../../node_modules/nouislider/distribute/nouislider.min.css"],
   encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
	
filmsFilterParametr:any; 
someKeyboardConfig: any = {
  behaviour: 'drag',
  connect: true,
  start: [0, 5],
  keyboard: true,  // same as [keyboard]="true"
  step: 0.1,
  pageSteps: 10,  // number of page steps, defaults to 10
  range: {
    min: 0,
    max: 10
  },
  pips: {
    mode: 'count',
    density: 2,
    values: 6,
    stepped: true
  }
};
	
 
  constructor(private usersService : usersService){}
  saveFilmParametr(){
	  
    this.usersService.saveFilmParametr(this.filmsFilterParametr);
	  
  }
  ngOnInit() {
	  
	this.filmsFilterParametr =  this.usersService.filmsFilterParametr ;
	 
  }

}
