import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './../../services/task/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskComponent } from './edit-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { TaskAction } from '../../interfaces/task.interface';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let taskService: TaskService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskComponent ],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },
      {provide:MAT_DIALOG_DATA,useValue:{}}
      ]
    })
    .compileComponents();

    taskService = TestBed.inject(TaskService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    taskService.emit(TaskAction.GET_TASKS, {});
    expect(component).toBeTruthy();
  });
});
