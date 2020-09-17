import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditprestamoComponent } from './editprestamo.component';

describe('EditprestamoComponent', () => {
  let component: EditprestamoComponent;
  let fixture: ComponentFixture<EditprestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprestamoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditprestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
