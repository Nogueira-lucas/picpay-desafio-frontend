import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/core/material/material.module';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/core/models/tasks.model';
import { TaskService } from 'src/core/services/task/task.service';
import { DialogRemoveTaskComponent } from './dialog-remove-task.component';
import { TaskModule } from 'src/pages/task/task.module';
import { Observable, of } from 'rxjs';

const mockData = null;

class MockTaskService {
    delete(): Observable<any[]> {
        return mockData;
    }
}

describe('Component: DialogRemoveTask', () => {
    let component: DialogRemoveTaskComponent;
    let fixture: ComponentFixture<DialogRemoveTaskComponent>;
    let service: TaskService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogRemoveTaskComponent],
            imports: [RouterTestingModule, BrowserAnimationsModule, MatSnackBarModule, MaterialModule,
                 MatDialogModule, HttpClientTestingModule, FormsModule, TaskModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
                { provide: TaskService, useClass: MockTaskService }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogRemoveTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.inject(TaskService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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

    it(`Deleting a payment`, () => {

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


        const saveButton = fixture.nativeElement.querySelector('.remove-button');
        saveButton.click();

        fixture.whenStable().then(() => {
            expect(service.delete).toHaveBeenCalled();
        });


    });
});
