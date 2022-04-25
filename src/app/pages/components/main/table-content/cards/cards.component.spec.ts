import { CardsComponent } from './cards.component';
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
import { HttpClientModule } from '@angular/common/http';
import { SortByPipe } from 'src/core/pipes/orderby.pipe';


describe ("CardsComponent", () => {
    let component: CardsComponent;
    let fixture: ComponentFixture<CardsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardsComponent, SortByPipe],
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
        fixture = TestBed.createComponent(CardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});