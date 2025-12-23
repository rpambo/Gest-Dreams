import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesParceiro } from './clientes-parceiro';

describe('ClientesParceiro', () => {
  let component: ClientesParceiro;
  let fixture: ComponentFixture<ClientesParceiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesParceiro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesParceiro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
