import { Component,Input } from '@angular/core';
import { usersService } from '../../users.service';
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']

})
export class dayComponent {
@Input()days;  
    week;
	mounth;
	dayNomber;
	filmsFilterParametr:any;
	mounthMas:string[] = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    weekMas:string[] = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","	Пятница","Суббота"];
    constructor(private usersService : usersService){}
    ngOnInit(){
	    this.filmsFilterParametr=this.usersService.filmsFilterParametr ;
		this.mounth = this.mounthMas[this.days.mounth];
		
		if(this.days.week-2<0)
			this.week= this.weekMas[this.days.week];
		else
			this.week=this.weekMas[this.days.week];
		this.dayNomber = this.days.day+1;
	
	}
	
} 