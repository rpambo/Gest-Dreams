import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Essencia } from './essencia';

describe('Essencia', () => {
  let component: Essencia;
  let fixture: ComponentFixture<Essencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Essencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Essencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
