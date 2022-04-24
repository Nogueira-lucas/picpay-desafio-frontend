import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TableService } from 'src/core/services/table.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableContentRoutingModule } from './table/table-content.routing';
import { CardsComponent } from './cards/cards.component';
import { TableContentComponent } from './table-content.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { getPtPaginatorIntl } from 'src/core/utils/paginator';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe ("TableContentComponent", () => {
    let component: TableContentComponent;
    let fixture: ComponentFixture<TableContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableContentComponent, TableComponent, CardsComponent],
            imports: [
                CommonModule,
                HttpClientModule,
                BrowserAnimationsModule,
                TableContentRoutingModule,
                FormsModule,
                //region Material Modules
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
                //endregion Material Modules
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
        fixture = TestBed.createComponent(TableContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});