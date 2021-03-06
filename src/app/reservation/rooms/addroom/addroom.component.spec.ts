import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddroomComponent } from 'src/rooms/add_room/addroom.component';



describe('AddroomComponent', () => {
  let component: AddroomComponent;
  let fixture: ComponentFixture<AddroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
