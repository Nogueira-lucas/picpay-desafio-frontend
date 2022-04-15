import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './item-list.component';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render without subItem', () => {
    component.item = 'Item name'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.item-list__item')).toBeTruthy();
    expect(compiled.querySelector('.item-list__item').textContent).toBe('Item name');
    expect(compiled.querySelector('.item-list__subItem')).toBeFalsy();
  });

  it('should render with subItem', () => {
    component.item = 'Item name'
    component.subItem = 'SubItem name'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.item-list__item')).toBeTruthy();
    expect(compiled.querySelector('.item-list__item').textContent).toBe('Item name');
    expect(compiled.querySelector('.item-list__subItem')).toBeTruthy();
    expect(compiled.querySelector('.item-list__subItem').textContent).toBe('SubItem name');
  });
});
