import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHospedajeComponent } from './gestion-hospedaje.component';

describe('GestionHospedajeComponent', () => {
  let component: GestionHospedajeComponent;
  let fixture: ComponentFixture<GestionHospedajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionHospedajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionHospedajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
