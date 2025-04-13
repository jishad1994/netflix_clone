import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCuroselComponent } from './movie-curosel.component';

describe('MovieCuroselComponent', () => {
  let component: MovieCuroselComponent;
  let fixture: ComponentFixture<MovieCuroselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCuroselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCuroselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
