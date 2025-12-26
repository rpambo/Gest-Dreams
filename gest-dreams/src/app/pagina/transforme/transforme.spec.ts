import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transforme } from './transforme';

describe('Transforme', () => {
  let component: Transforme;
  let fixture: ComponentFixture<Transforme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transforme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transforme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
