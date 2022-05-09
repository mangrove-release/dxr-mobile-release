import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchContextComponent } from './switch-context.component';

describe('SwitchContextComponent', () => {
  let component: SwitchContextComponent;
  let fixture: ComponentFixture<SwitchContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchContextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
