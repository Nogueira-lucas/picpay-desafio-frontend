import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableService } from 'src/core/services/table.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { getPtPaginatorIntl } from 'src/core/utils/paginator';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';

describe ("TableComponent", () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableComponent],
            imports: [
                CommonModule,
                FormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                MatTableModule,
                MatProgressSpinnerModule,
                MatPaginatorModule,
                MatIconModule,
                MatInputModule,
                MatFormFieldModule,
                MatDialogModule,
                MatSortModule,
                MatSnackBarModule,
                MatTooltipModule
            ],
            providers: [
                DatePipe,
                CurrencyPipe,
                TableService,
                {
                  provide: MatPaginatorIntl,
                  useValue: getPtPaginatorIntl(),
                },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});