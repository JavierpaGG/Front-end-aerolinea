import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GVuelosBoletosComponent } from './g-vuelos-boletos.component';

describe('GVuelosBoletosComponent', () => {
  let component: GVuelosBoletosComponent;
  let fixture: ComponentFixture<GVuelosBoletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GVuelosBoletosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GVuelosBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
