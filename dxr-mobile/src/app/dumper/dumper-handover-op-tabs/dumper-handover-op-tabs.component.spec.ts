import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DumperHandoverOpTabsComponent } from './dumper-handover-op-tabs.component';

describe('DumperHandoverOpTabsComponent', () => {
  let component: DumperHandoverOpTabsComponent;
  let fixture: ComponentFixture<DumperHandoverOpTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DumperHandoverOpTabsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DumperHandoverOpTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
