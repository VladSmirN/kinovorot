import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFilmComponent } from './about-film.component';

describe('AboutFilmComponent', () => {
  let component: AboutFilmComponent;
  let fixture: ComponentFixture<AboutFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
