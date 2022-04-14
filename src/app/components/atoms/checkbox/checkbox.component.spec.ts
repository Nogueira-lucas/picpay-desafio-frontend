import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with input unchecked', () => {
    component.name = 'payment'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.checkbox input').getAttribute('value')).toBe('false');
    expect(compiled.querySelector('.checkbox input').getAttribute('name')).toBe('payment');
  });
  it('should render with input checked', () => {
    component.name = 'payment'
    component.checked = true
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.checkbox input').getAttribute('value')).toBe('true');
    expect(compiled.querySelector('.checkbox input').getAttribute('name')).toBe('payment');
  });

});
