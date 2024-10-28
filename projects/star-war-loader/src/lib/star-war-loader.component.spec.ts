import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarLoaderComponent } from './star-war-loader.component';

describe('StarWarLoaderComponent', () => {
  let component: StarWarLoaderComponent;
  let fixture: ComponentFixture<StarWarLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarWarLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarWarLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
