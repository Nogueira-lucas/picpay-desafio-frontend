import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CountPageComponent } from './count-page.component';

describe('CountPageComponent', () => {
  let component: CountPageComponent;
  let fixture: ComponentFixture<CountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should render component', () => {
  //   component.limit = 10
  //   component.current = 1
  //   component.total = 170
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     const compiled = fixture.debugElement.nativeElement;
  //     // expect(compiled.querySelector('.logo').getAttribute('class')).toBe('logo disabled--default');
  //   })
  // });

});
