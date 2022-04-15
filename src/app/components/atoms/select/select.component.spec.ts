import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
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
    expect(compiled.querySelector('.select label').textContent.trim()).toBe('Texto button');
  });

  it('should render with items', () => {
    component.items = ['2','4','6']
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.select select option')[0].getAttribute('value')).toBe('2');
    expect(compiled.querySelectorAll('.select select option')[1].getAttribute('value')).toBe('4');
    expect(compiled.querySelectorAll('.select select option')[2].getAttribute('value')).toBe('6');
  });
});
