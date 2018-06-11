import { Directive,HostListener,HostBinding} from '@angular/core';

@Directive({
    selector:"[appHover]"
}
	)
export class hoverDerective {
	
   @HostBinding("class.hover") isHoover = false;
   @HostListener("mouseenter") onMouseEnter(){
      this.isHoover =true;

   }
  @HostListener("mouseleave") onMouseLeave(){
      this.isHoover =false;

   }
   
}