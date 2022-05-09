import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorServicesComponent } from './visitor-services.component';

describe('VisitorServicesComponent', () => {
  let component: VisitorServicesComponent;
  let fixture: ComponentFixture<VisitorServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
