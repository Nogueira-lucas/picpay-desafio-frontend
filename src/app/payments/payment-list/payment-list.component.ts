import { ModalComponent } from './../../modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments = null;
  title = 'ng-bootstrap-modal-demo';

  constructor(
    private paymentsService: PaymentsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  // Lista pagamentos
  private getPayments(): void{
    this.paymentsService.list().subscribe(result => {
      this.payments = result;
    });
  }

  // Abre a modal
  open() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
  }
}
