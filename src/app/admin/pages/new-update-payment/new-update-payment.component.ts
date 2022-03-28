import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksService } from '@api/tasks.service';

interface DialogData {
  id?: number
}

@Component({
  selector: 'app-new-update-payment',
  templateUrl: './new-update-payment.component.html',
  styleUrls: ['./new-update-payment.component.scss']
})
export class NewUpdatePaymentComponent implements OnInit {

  formPayment: FormGroup
  editMode: boolean

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<NewUpdatePaymentComponent>,
    private fb: FormBuilder,
    private readonly tasksService: TasksService,
    private toastr: ToastrService
  ) { 
    if(this.data.id) this.editMode = true
    this.formPayment = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      title: [''],
    })
    if(this.editMode) this.getTasksId()
  }

  ngOnInit(): void {
  }

  
  getTasksId(): void {
    this.tasksService.getTasksId(this.data.id).subscribe(response => {
      this.formPayment.patchValue(response)
    }, error => this.toastr.error('Não foi possível carregar o pagamento'))
  }

  submit() {
    if (this.formPayment.valid) {
      if (this.editMode) {
        this.tasksService.putTasks(this.formPayment.value, this.data.id).subscribe(response => {
          this.dialogRef.close()
          this.toastr.success('Pagamento Alterado', 'Sucesso!')
        }, error => {
          this.toastr.error(`${error.error.message}`)
        })
      } else {
        this.tasksService.postTasks(this.formPayment.value).subscribe(response => {
          this.dialogRef.close()
          this.toastr.success('Pagamento Cadastrado', 'Sucesso!')
        }, error => {
          this.toastr.error(`${error.error.message}`)
        })
      }
    } else {
      this.formPayment.markAllAsTouched()
      this.toastr.error('Preencha os campos inválidos')
    }
  }
}
