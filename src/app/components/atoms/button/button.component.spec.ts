import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with label', () => {
    component.label = 'Texto button'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').textContent.trim()).toBe('Texto button');
  });

  it('should render with type submit', () => {
    component.type = 'submit'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('type')).toBe('submit');
  });

  it('should render with size small', () => {
    component.size = 'small'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--small button--primary disabled--left');
  });

  it('should render with size medium', () => {
    component.size = 'medium'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--medium button--primary disabled--left');
  });

  it('should render with size large', () => {
    component.size = 'large'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--large button--primary disabled--left');
  });

  it('should render with size full', () => {
    component.size = 'full'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--full button--primary disabled--left');
  });

  it('should render without primary props', () => {
    component.primary = false
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--medium button--secondary disabled--left');
  });

  it('should render with icon left props', () => {
    component.icon = 'tune'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--medium button--primary disabled--right');
  });

  it('should render with icon left props', () => {
    component.icon = 'tune'
    component.iconDirection = 'right'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--medium button--primary disabled--left');
  });
});
