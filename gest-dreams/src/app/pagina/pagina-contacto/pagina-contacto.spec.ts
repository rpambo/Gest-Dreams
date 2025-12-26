import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaContacto } from './pagina-contacto';

describe('PaginaContacto', () => {
  let component: PaginaContacto;
  let fixture: ComponentFixture<PaginaContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaContacto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaContacto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
