import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeletePaymentComponent } from 'src/app/pages/payments/components/delete-payment/delete-payment.component';
import { PaymentModalComponent } from 'src/app/pages/payments/components/payment-modal/payment-modal.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { SortableDirective } from 'src/app/shared/directives/sortable.directive';
import { Payment } from 'src/app/shared/models/payment';
import { PaymentParameters } from 'src/app/shared/models/payment-parameters';
import { SortEvent } from 'src/app/shared/models/sort-event';

@Component({
    selector: 'app-payments',
    templateUrl: './payments-list.component.html',
    styleUrls: ['./payments-list.component.scss'],
})
export class PaymentsListComponent implements OnInit, OnDestroy {
    onDestyoy$: Subject<void>;

    payments: Payment[] = [];
    displayedColumns: string[] = ['name'];
    dataSource: Payment[] = [];

    page = 1;
    pageSize = 5;
    sortColumn: string;
    order = '';
    search: string;
    collectionSize = this.payments.length;
    filteredPayments: Payment[];

    constructor(
        private paymentService: PaymentsService,
        private modalService: NgbModal,
        private alertService: AlertService
    ) {
        this.onDestyoy$ = new Subject<void>();
    }
    @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

    ngOnInit() {
        this.listPayments();
    }

    ngOnDestroy(): void {
        this.onDestyoy$.next();
        this.onDestyoy$.complete();
    }

    listPayments(): void {
        const params: PaymentParameters = {
            _limit: this.pageSize,
            _order: this.order,
            _page: this.page,
            _sort: this.sortColumn,
        };

        if (this.search) {
            params.name_like = this.search;
        }

        if (!this.order) {
            params._order = '';
            params._sort = '';
        }

        this.paymentService.listAllPayments(params).subscribe((response) => {
            this.payments = response;
            this.filteredPayments = this.payments;
            this.dataSource = this.payments;
        });
    }

    openDeleteModal(payment: Payment) {
        const modal = this.modalService.open(DeletePaymentComponent, { size: 'sm', centered: true });
        modal.componentInstance.payment = payment;
        modal.dismissed.pipe(takeUntil(this.onDestyoy$)).subscribe(() => {
            this.listPayments();
        });
    }

    openPaymentModal(payment?: Payment) {
        const modal = this.modalService.open(PaymentModalComponent, { size: 'md', centered: true });
        modal.componentInstance.payment = payment;
        modal.dismissed.pipe(takeUntil(this.onDestyoy$)).subscribe(() => {
            this.listPayments();
        });
    }

    sortPayments({ column, direction }: SortEvent) {
        this.sortColumn = column;
        this.order = direction;
        this.resetHeaders(column);
        this.listPayments();
    }

    markAsPaid(payment: Payment) {
        const request: Partial<Payment> = {
            isPayed: !payment.isPayed,
        };

        this.paymentService.markAsPaid(payment.id, request).subscribe(
            () => this.alertService.showSuccess('Oba! O campo foi alterado com sucesso!'),
            () => this.alertService.showDanger('Ops... Algo errado aconteceu :(')
        );
    }

    private resetHeaders(column: string) {
        this.headers.forEach((header) => {
            if (this.sortColumn !== column) {
                header.direction = '';
                this.sortColumn = '';
            }
        });
    }
}
