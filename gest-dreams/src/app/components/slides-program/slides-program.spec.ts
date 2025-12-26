import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesProgram } from './slides-program';

describe('SlidesProgram', () => {
  let component: SlidesProgram;
  let fixture: ComponentFixture<SlidesProgram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidesProgram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidesProgram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
