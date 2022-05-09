import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TripCompletionCodePopupComponent } from './trip-completion-code-popup.component';

describe('TripCompletionCodePopupComponent', () => {
  let component: TripCompletionCodePopupComponent;
  let fixture: ComponentFixture<TripCompletionCodePopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCompletionCodePopupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripCompletionCodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
