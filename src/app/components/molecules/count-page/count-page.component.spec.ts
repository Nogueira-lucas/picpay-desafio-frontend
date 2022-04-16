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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with list', () => {
    component.list = Array.from(new Array(170/10), (v, k) => `${k}`);
    component.current = 0
    component.total = 170
    component.limit = 10
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.count-page__item')[0].textContent).toBe('1');
    expect(compiled.querySelectorAll('.count-page__item')[1].textContent).toBe('2');
  });

});
