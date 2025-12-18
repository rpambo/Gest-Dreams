import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndaSection } from './onda-section';

describe('OndaSection', () => {
  let component: OndaSection;
  let fixture: ComponentFixture<OndaSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OndaSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OndaSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
