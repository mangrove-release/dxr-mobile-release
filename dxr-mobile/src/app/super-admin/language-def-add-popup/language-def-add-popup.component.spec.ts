import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDefAddPopupComponent } from './language-def-add-popup.component';

describe('LanguageDefAddPopupComponent', () => {
  let component: LanguageDefAddPopupComponent;
  let fixture: ComponentFixture<LanguageDefAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageDefAddPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageDefAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
