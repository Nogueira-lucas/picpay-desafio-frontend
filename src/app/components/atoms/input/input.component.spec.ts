import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render with style search', () => {
    component.style = 'search'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.input.input__container label').getAttribute('class')).toBe('input__label input--disabled');
    expect(compiled.querySelector('.input.input__container input').getAttribute('class')).toBe('input__input input__input--search');
  });

  it('should render with style default', () => {
    component.style = 'default'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.input.input__container label').getAttribute('class')).toBe('input__label input--disabled');
    expect(compiled.querySelector('.input.input__container input').getAttribute('class')).toBe('input__input input__input--default');
  });

  it('should render with style login', () => {
    component.style = 'login'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.input.input__container label').getAttribute('class')).toBe('input__label');
    expect(compiled.querySelector('.input.input__container input').getAttribute('class')).toBe('input__input input__input--login');
  });
});
