import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
  name: 'filmsFilter' 
})
export class FilmsFilterPipe implements PipeTransform {

  transform(films,parametr) {

	
return	films.filter(film=>{
		
	    if(film.ratingKinopoisk <= parametr.ratingKinopoisk[1] &&
	       film.ratingKinopoisk  >= parametr.ratingKinopoisk[0] &&
           film.ratingImdb  <= parametr.ratingImdb[1] && 	
           film.ratingImdb  >= parametr.ratingImdb[0]  )
		    return 1;
		else
		  return 0;
	});
	
	
  }

}

 