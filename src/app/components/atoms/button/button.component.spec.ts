import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

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
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--small button--primary');
  });

  it('should render with size medium', () => {
    component.size = 'medium'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--medium button--primary');
  });

  it('should render with size large', () => {
    component.size = 'large'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--large button--primary');
  });

  it('should render with size full', () => {
    component.size = 'full'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--full button--primary');
  });

  it('should render without primary props', () => {
    component.primary = false
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button').getAttribute('class')).toBe('button button--medium button--secondary');
  });

  it('should render with icon iconDirection left', () => {
    component.icon = 'tune'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button .button__icon--left')).toBeTruthy();
    expect(compiled.querySelector('.button .button__icon--right')).toBeFalsy();
  });

  it('should render with icon iconDirection right', () => {
    component.icon = 'tune'
    component.iconDirection = 'right'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.button .button__icon--right')).toBeTruthy();
    expect(compiled.querySelector('.button .button__icon--left')).toBeFalsy();
  });

  it('should event onClick', fakeAsync(() => {
    spyOn(component, 'onClick');
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('.button').click();
    fixture.whenStable().then(() => {
      expect(component.onClick).toHaveBeenCalled();
    });
  }));

});
