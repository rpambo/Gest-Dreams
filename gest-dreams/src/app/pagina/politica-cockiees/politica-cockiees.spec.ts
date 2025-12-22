import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaCockiees } from './politica-cockiees';

describe('PoliticaCockiees', () => {
  let component: PoliticaCockiees;
  let fixture: ComponentFixture<PoliticaCockiees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticaCockiees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticaCockiees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
