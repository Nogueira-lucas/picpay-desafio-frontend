import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Task from 'src/models/task.model'
import * as moment from 'moment'
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@Component({
  selector: 'app-manage-payment-modal',
  templateUrl: './manage-payment-modal.component.html',
  styleUrls: ['./manage-payment-modal.component.scss'],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
})
export class ManagePaymentModalComponent implements OnInit {

  task: Task = new Task();
  taskFormGroup: FormGroup;
  selectOptions: any =   [
    { name: 'Não', value: 0 },
    { name: 'Sim', value: 1 },
  ];
  selectedOption: any = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ManagePaymentModalComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    
  ) {
    this.taskFormGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      isPayed: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
    this.setUserInfo()
    
  }

  setUserInfo(){
    if(this.data.isTaskCreate){
      this.selectedOption = this.selectOptions[0]   
    
    } else if(this.data.isTaskEdit){
      let dateTime: moment.Moment = moment(this.data.taskToBeEditted.date)
      let time = dateTime.format("HH:mm:ss")

      this.taskFormGroup.controls['name'].setValue(this.data.taskToBeEditted.name) 
      this.taskFormGroup.controls['username'].setValue(this.data.taskToBeEditted.username) 
      this.taskFormGroup.controls['value'].setValue(this.data.taskToBeEditted.value)
      this.taskFormGroup.controls['date'].setValue(this.data.taskToBeEditted.date)
      this.taskFormGroup.controls['time'].setValue(time)
      this.taskFormGroup.controls['title'].setValue(this.data.taskToBeEditted.title)    
      this.taskFormGroup.controls['isPayed'].setValue(this.data.taskToBeEditted.isPayed)
      this.selectedOption = this.data.taskToBeEditted.isPayed? this.selectOptions[1] : this.selectOptions[0]    
    }
    
  }

  close(){
    this.taskFormGroup.reset()
    this.dialogRef.close(null)
  }

  confirm(){
    if(this.data.isTaskEdit || this.data.isTaskCreate){
      this.task.name = this.taskFormGroup.controls['name'].value
      this.task.username = this.taskFormGroup.controls['username'].value
      this.task.value = this.taskFormGroup.controls['value'].value
      this.task.title = this.taskFormGroup.controls['title'].value
      this.task.isPayed = this.taskFormGroup.controls['isPayed'].value
      
      let newDate: moment.Moment = moment.utc( this.taskFormGroup.controls['date'].value).local()
      this.task.date = newDate.format("YYYY-MM-DD") + "T" + this.taskFormGroup.controls['time'].value;
      
      this.dialogRef.close({
        ...(this.data.isTaskEdit && {taskId: this.data.taskToBeEditted.id}), 
        task: this.task
      })
    
    } else {
      this.dialogRef.close(true)
    }
  }

}
