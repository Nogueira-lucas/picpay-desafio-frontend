import { TableService } from 'src/core/services/table.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableContentRoutingModule } from './table/table-content.routing';
import { CardsComponent } from './cards/cards.component';
import { TableContentComponent } from './table-content.component';
import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableContentRoutingModule,
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
  declarations: [
      TableContentComponent,
      TableComponent,
      CardsComponent
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
export class TableContentModule { }
