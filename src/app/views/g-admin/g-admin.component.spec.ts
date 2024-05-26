import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAdminComponent } from './g-admin.component';

describe('GAdminComponent', () => {
  let component: GAdminComponent;
  let fixture: ComponentFixture<GAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
