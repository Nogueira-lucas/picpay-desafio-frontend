import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './../../services/task/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EditTaskComponent } from './edit-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { ITask, TaskAction } from '../../interfaces/task.interface';
import { DebugElement } from '@angular/core';
import { from } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let taskService: TaskService;
  let debugElement: DebugElement;
  
  const TASK_MOCK: ITask = 
    {
      "id": 1,
      "name": "Pennie Dumphries",
      "username": "pdumphries0",
      "title": "Dentatist rtest",
      "value": "0.01",
      "date": "2020-08-21T05:50:00.000Z",
      "image": "https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1",
      "isPayed": true
    };

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

  it('should save task edition with success', fakeAsync(() => {
    debugElement = fixture.debugElement;
    spyOn(taskService, 'updateTask').and.callThrough().and.returnValue(from([TASK_MOCK]));

    let nameInput = debugElement.query(By.css('#name')).nativeElement;
    let valueInput = debugElement.query(By.css('#value')).nativeElement;
    let titleInput = debugElement.query(By.css('#title')).nativeElement;
    let dateInput = debugElement.query(By.css('#date')).nativeElement;

    nameInput.value = TASK_MOCK.name;
    valueInput.value = TASK_MOCK.value;
    titleInput.value = TASK_MOCK.title;
    dateInput.value = TASK_MOCK.date;

    nameInput.dispatchEvent(new Event('input'));
    valueInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('input'));
    dateInput.dispatchEvent(new Event('input'));
    

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toEqual(component.form.get('name').value);
      expect(valueInput.value).toEqual(component.form.get('value').value);
      expect(titleInput.value).toEqual(component.form.get('title').value);
      expect(component.form.errors).toBeNull();
    });

    tick(2501);
    component.onSubmit();
  }));
});
