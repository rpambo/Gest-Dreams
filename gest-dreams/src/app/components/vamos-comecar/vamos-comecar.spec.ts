import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VamosComecar } from './vamos-comecar';

describe('VamosComecar', () => {
  let component: VamosComecar;
  let fixture: ComponentFixture<VamosComecar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VamosComecar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VamosComecar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
