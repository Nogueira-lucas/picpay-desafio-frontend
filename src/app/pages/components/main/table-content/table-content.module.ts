import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableContentRoutingModule } from './table/table-content.routing';
import { CardsComponent } from './cards/cards.component';
import { TableContentComponent } from './table-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
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
    //endregion Material Modules
  ],
  declarations: [
      TableContentComponent,
      TableComponent,
      CardsComponent
    ]
})
export class TableContentModule { }
