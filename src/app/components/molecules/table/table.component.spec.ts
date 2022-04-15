import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const tableHead = ['Usuário', 'Título']
  const list = [
    {
      id: '1',
      items: [
        {item: 'Monique', subItem: '@monique'}
      ],
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with tableHead', () => {
    component.tableHead = tableHead

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const th1 = compiled.querySelectorAll('.table th')[0]
    const th2 = compiled.querySelectorAll('.table th')[1]
    expect(th1.querySelector('span').textContent.trim()).toBe('Usuário');
    expect(th2.querySelector('span').textContent.trim()).toBe('Título');
  });

  it('should render without tableHead', () => {
    component.tableHead = []

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const th1 = compiled.querySelectorAll('.table .table__title th')[0]
    expect(th1).toBeFalsy();
  });

  it('should render with list', () => {
    component.list = list

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const tr1 = compiled.querySelectorAll('.table .table__body tr')[0]
    expect(tr1.querySelectorAll('td')[0]).toBeTruthy();
    expect(tr1.querySelectorAll('td')[1].querySelector('.table__button')).toBeTruthy();
  });

  it('should render without list', () => {
    component.list = []

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const tr1 = compiled.querySelectorAll('.table .table__body tr')[0]
    expect(tr1).toBeFalsy();
  });

});
