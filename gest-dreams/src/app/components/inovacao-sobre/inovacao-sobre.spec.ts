import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InovacaoSobre } from './inovacao-sobre';

describe('InovacaoSobre', () => {
  let component: InovacaoSobre;
  let fixture: ComponentFixture<InovacaoSobre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InovacaoSobre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InovacaoSobre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
