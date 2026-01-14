import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamacaoSection } from './reclamacao-section';

describe('ReclamacaoSection', () => {
  let component: ReclamacaoSection;
  let fixture: ComponentFixture<ReclamacaoSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamacaoSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamacaoSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
