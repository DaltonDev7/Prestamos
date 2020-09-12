import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrolistPage } from './registrolist.page';

describe('RegistrolistPage', () => {
  let component: RegistrolistPage;
  let fixture: ComponentFixture<RegistrolistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrolistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrolistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
