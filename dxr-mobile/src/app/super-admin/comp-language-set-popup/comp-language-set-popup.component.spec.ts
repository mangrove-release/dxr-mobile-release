import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompLanguageSetPopupComponent } from './comp-language-set-popup.component';

describe('CompLanguageSetPopupComponent', () => {
  let component: CompLanguageSetPopupComponent;
  let fixture: ComponentFixture<CompLanguageSetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompLanguageSetPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompLanguageSetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
