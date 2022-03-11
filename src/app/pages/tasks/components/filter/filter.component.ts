import { TaskAction } from './../../interfaces/task.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  form: FormGroup;
  dialogType: string;
  inputDateFormatted: string;
  constructor(private readonly fb: FormBuilder,
              private readonly dialogRef: MatDialogRef<EditTaskComponent>,
              @Inject(MAT_DIALOG_DATA) private readonly data,
              private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.dialogType = this.data.type;

    this.form = this.fb.group({
      title_like: [],
      value_gte: [],
      value_lte: [],
      isPayed: []
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

  updateDatetime() {
    const inputDateTime = this.form.get('date').value;
    this.inputDateFormatted = (typeof inputDateTime !== 'string') ? inputDateTime._d : inputDateTime;
  }

  onSubmit() {

    this.taskService.emit(TaskAction.SEARCH_TASKS, {...this.form.value});
    this.dismiss();
  }
}
