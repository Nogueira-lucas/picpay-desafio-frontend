import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentsService } from 'src/app/services/payments.service';
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
  
  constructor(private service: PaymentsService){}

  ngOnInit(){
    
    this.formData = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      value: new FormControl(),
      date: new FormControl(),
      title: new FormControl()
    })

    this.formData.patchValue(this.payment)
  }

  onSubmit(e, data): void{
    e.preventDefault()
    if(!this.formData.invalid) {
      data.data = getHoursDate(data.data)
      this.service.save(data)
    }
  }
  
  onHide(){
    this.formData.reset()
    this.hide.emit()
  }

}
