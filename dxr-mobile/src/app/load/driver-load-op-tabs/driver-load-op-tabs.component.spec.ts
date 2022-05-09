import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverLoadOpTabsComponent } from './driver-load-op-tabs.component';

describe('DriverLoadOpTabsComponent', () => {
  let component: DriverLoadOpTabsComponent;
  let fixture: ComponentFixture<DriverLoadOpTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverLoadOpTabsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverLoadOpTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
