import { Subscription } from 'rxjs';
import { TransactionStatusService } from './../../services/transaction-status/transaction-status.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { BackgroundTemplateTypes, ITransactionTemplateMessage, TemplateIcons } from '../../interfaces/transaction-status.interface';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.scss'],
  animations: [
    trigger('openDismiss', [
      transition(':leave', [
        style({ overflow: 'hidden', 'min-height': 0 }),
        animate('200ms linear', style({ height: 0, 'padding-top': 0, 'padding-bottom': 0 })),
      ]),
      transition(':enter', [
        style({ height: 0, 'min-height': 0, 'padding-top': 0, 'padding-bottom': 0 }),
        animate('200ms linear', style({ height: '*', 'min-height': '*', 'padding-top': '*', 'padding-bottom': '*' })),
      ]),
    ]),
  ],
})
export class TransactionStatusComponent implements OnInit {

  @Input()
  ariaPolite = false;
  @Input()
  ariaRole = false;
  templateIcon: string = BackgroundTemplateTypes.error;
  transactionTemplate: ITransactionTemplateMessage = { displayMessage: false, message: 'Ocorreu um erro inesperado, tente novamente por favor.', type: BackgroundTemplateTypes.error };
  subscription: Subscription;
  constructor(private readonly transitionStatus: TransactionStatusService) { }

  ngOnInit(): void {
    this.subscription = this.transitionStatus.transactionStatusState$.subscribe(data => {
      if (data) {
        this.transactionTemplate = data;
        this.templateIcon = this.transactionTemplate.type;
      }
    });
  }

  hide() {
    this.transitionStatus.hide();
  }
}
