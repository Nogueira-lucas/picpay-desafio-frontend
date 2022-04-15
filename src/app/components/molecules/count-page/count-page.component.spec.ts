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
    component.list = ['1', '2'];
    component.current = '2'
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.count-page__item')[0].textContent).toBe('1');
    expect(compiled.querySelectorAll('.count-page__item')[1].textContent).toBe('2');
  });

});
