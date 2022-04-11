import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogAddTaskComponent } from './dialog-add-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/core/material/material.module';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/core/models/tasks.model';
import { TaskService } from 'src/core/services/task/task.service';
import { TaskModule } from 'src/pages/task/task.module';
import { Observable, of } from 'rxjs';

let mockData = null;

class MockTaskService {
    create(): Observable<any[]> {
        return mockData;
    }
    update(): Observable<any[]> {
        return mockData;
    }
}

describe('Component: DialogAddTask', () => {
    let component: DialogAddTaskComponent;
    let fixture: ComponentFixture<DialogAddTaskComponent>;
    let service: TaskService;

    const mockTask =
    {
        name: 'Lilith Graver',
        username: null,
        title: 'Accounting Assistant II',
        value: 121.42,
        date: '2020-10-23T06:36:48Z',
        isPayed: null,
        image: null
    };


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogAddTaskComponent],
            imports: [RouterTestingModule, BrowserAnimationsModule, MatSnackBarModule, MaterialModule, MatDialogModule,
                HttpClientTestingModule, FormsModule, TaskModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
                { provide: TaskService, useClass: MockTaskService }
            ]
        })
            .compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogAddTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.inject(TaskService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`Updating the value of the form, so the value of the form must be changed`, () => {

        component.taskForm.controls.name.setValue(mockTask.name);
        component.taskForm.controls.value.setValue(mockTask.value);
        component.taskForm.controls.date.setValue(mockTask.date);
        component.taskForm.controls.title.setValue(mockTask.title);

        expect(component.taskForm.value).toEqual(mockTask);

    });

    it(`Creating the new payment`, () => {

        component.taskForm.controls.name.setValue(mockTask.name);
        component.taskForm.controls.value.setValue(mockTask.value);
        component.taskForm.controls.date.setValue(mockTask.date);
        component.taskForm.controls.title.setValue(mockTask.title);

        const accountDate = [
            {
                id: 200,
                name: 'Lilith Graver',
                username: 'lgraver1i',
                title: 'Accounting Assistant II',
                value: 121.42,
                date: '2020-10-23T06:36:48Z',
                image: 'https://robohash.org/dictaexnumquam.png?size=150x150&set=set1',
                isPayed: false
            },
        ];

        mockData = of(accountDate);


        const saveButton = fixture.nativeElement.querySelector('.save-button');
        saveButton.click();

        fixture.whenStable().then(() => {
            expect(service.create).toHaveBeenCalled();
        });

    });

    it(`Loading payment details`, () => {

        const day = new Date();


        const task = new Task().deserialize({
            date: day,
            id: 5,
            name: 'Anthea Pundy',
            title: 'Software Engineer III',
            username: 'apundy4',
            value: 177.19
        });

        component.data = task;

        expect(component.data.name).toEqual(task.name);

    });

    it(`Updating a payment amount`, () => {

        const day = new Date();

        const task = new Task().deserialize({
            date: day,
            id: 5,
            name: 'Anthea Pundy',
            title: 'Software Engineer III',
            username: 'apundy4',
            value: 100.00
        });

        component.data = task;

        const accountDate = [
            {
                id: 200,
                name: 'Lilith Graver',
                username: 'lgraver1i',
                title: 'Accounting Assistant II',
                value: 121.42,
                date: '2020-10-23T06:36:48Z',
                image: 'https://robohash.org/dictaexnumquam.png?size=150x150&set=set1',
                isPayed: false
            },
        ];

        mockData = of(accountDate);

        const saveButton = fixture.nativeElement.querySelector('.save-button');
        saveButton.click(task);

        fixture.whenStable().then(() => {
            expect(service.update).toHaveBeenCalled();
        });

    });
});
