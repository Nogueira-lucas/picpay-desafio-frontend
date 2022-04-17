import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentListComponent } from './payment-list.component';

describe('PaymentListComponent', () => {
  let component: PaymentListComponent;
  let fixture: ComponentFixture<PaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with tableHead', () => {
    component.limit = 5
    component.dataSource = {
      list: [
        {
          id: '1',
          items: [
            {item: 'Monique', subItem: '@monique'},
            {item: 'developr'},
            {item: '23 Abr 2020', subItem: '16:00 AM'},
            {item: 'R$ 500'},
            {item: true}
          ],
        },
      ],
      tableHead: ['Usuário', 'Título', 'Data', 'Valor', 'Pago'],
      total: 170
    }

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(component).toBeTruthy();
  });
});
