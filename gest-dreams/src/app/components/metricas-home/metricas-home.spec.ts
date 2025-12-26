import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricasHome } from './metricas-home';

describe('MetricasHome', () => {
  let component: MetricasHome;
  let fixture: ComponentFixture<MetricasHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricasHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricasHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
