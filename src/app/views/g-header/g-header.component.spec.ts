import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GHeaderComponent } from './g-header.component';

describe('GHeaderComponent', () => {
  let component: GHeaderComponent;
  let fixture: ComponentFixture<GHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
