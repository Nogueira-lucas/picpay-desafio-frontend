import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Payment } from 'src/app/shared/models/payment.model';
import { getHoursDate } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-form-payments',
  templateUrl: './form-payments.component.html',
  styleUrls: ['./form-payments.component.scss']
})
export class FormPaymentsComponent implements OnInit {

  @Input() show: boolean
  @Input() payment: Payment
  @Output() hide = new EventEmitter()

  formData: FormGroup

  constructor(private service: PaymentsService, private alert: AlertService, private auth: AuthService) { }

  ngOnInit() {
    this.formData = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      value: new FormControl(),
      date: new FormControl(),
      title: new FormControl(),
      username: new FormControl(),
      isPayed: new FormControl()      
    })

    if(!this.payment) this.payment = new Payment()

    if(this.payment?.date)
      this.payment.date = new Date(this.payment.date).toISOString().split('T')[0]
      
    this.payment.username = this.auth.user.name
    this.formData.patchValue(this.payment)
  }

  async onSubmit(e, data): Promise<void> {
    e.preventDefault()
    if (!this.formData.invalid) {
      data.date = getHoursDate(data.date)
      const result = await this.service.save(data) as Payment
      if (result?.id)
        this.alert.success("Salvo com sucesso!")
      else
        this.alert.error("Ocorreu um erro, por favor tente novamente!")
      this.onHide()
    }
  }

  onHide() {
    this.formData.reset()
    this.hide.emit()
  }

}
