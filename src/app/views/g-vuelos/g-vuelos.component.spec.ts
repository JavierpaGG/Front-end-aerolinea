import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GVuelosComponent } from './g-vuelos.component';

describe('GVuelosComponent', () => {
  let component: GVuelosComponent;
  let fixture: ComponentFixture<GVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GVuelosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
