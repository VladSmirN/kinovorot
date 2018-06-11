import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule} from '@angular/router'; 

import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { dayComponent } from './component/day/day.component';
import { hoverDerective } from './hover.derective';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AboutFilmComponent } from './component/about-film/about-film.component';
import { LoadComponent } from './component/load/load.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { FilmsFilterPipe } from './pipe/films-filter.pipe';



  
 const routes = [
   {path:"",component:HomePageComponent},
    {path:"aboutFilm/:id",component: AboutFilmComponent} ,
   {path:"settings",component:SettingsComponent}
 ];
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    dayComponent,
   hoverDerective,
   HomePageComponent,
   SettingsComponent,
   AboutFilmComponent,
   LoadComponent,
   FooterComponent,
   FilmsFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
	RouterModule.forRoot(routes),
	FormsModule,
	NouisliderModule
  ],
  providers: [HttpClientModule],
  bootstrap: [ AppComponent]
})
export class AppModule { }

