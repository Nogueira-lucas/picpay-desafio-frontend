import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/core/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskComponent } from './task.component';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { DialogsModule } from '../../components/dialogs/dialogs.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TaskService } from 'src/core/services/task/task.service';
import { DialogAddTaskComponent } from '../../components/dialogs/dialog-add-task/dialog-add-task.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModule } from 'src/pages/task/task.module';


describe('Component: Task', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;
    let service: TaskService;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskComponent],
            imports: [RouterTestingModule, MatSnackBarModule, FormsModule, MaterialModule,
                HttpClientTestingModule, BrowserAnimationsModule, ToolbarModule, DialogsModule,
                PaginationModule, MatDialogModule, TaskModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(TaskService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it(`Given the survey when it is executed, it will return only the requested payment`, () => {

        component.searchForm.controls.search.setValue('Lilith Graver');

        fixture.whenStable().then(() => {
            expect(service.findAll).toHaveBeenCalled();
            expect(service.findAll).toHaveBeenCalledWith('Lilith Graver');
        });

    });
});
