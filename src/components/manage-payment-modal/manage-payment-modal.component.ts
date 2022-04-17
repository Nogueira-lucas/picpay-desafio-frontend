import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment'

@Component({
  selector: 'app-manage-payment-modal',
  templateUrl: './manage-payment-modal.component.html',
  styleUrls: ['./manage-payment-modal.component.scss'],
  providers: [
    /* { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig } */
    
    /* {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }, */
  ]
})
export class ManagePaymentModalComponent implements OnInit {

  taskFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ManagePaymentModalComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    
  ) {
    this.taskFormGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required])
    });

   }

  ngOnInit(): void {
    debugger
  }

  close(){
    this.taskFormGroup.reset()
    this.dialogRef.close(null)
  }

}
