import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inovacao } from './inovacao';

describe('Inovacao', () => {
  let component: Inovacao;
  let fixture: ComponentFixture<Inovacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inovacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inovacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
