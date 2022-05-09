import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangDefButtonComponent } from './lang-def-button.component';

describe('LangDefButtonComponent', () => {
  let component: LangDefButtonComponent;
  let fixture: ComponentFixture<LangDefButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangDefButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangDefButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
