import { TableContentRoutingModule } from './table/table-content.routing';
import { CardsComponent } from './cards/cards.component';
import { TableContentComponent } from './table-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    TableContentRoutingModule
  ],
  declarations: [
      TableContentComponent,
      TableComponent,
      CardsComponent
    ]
})
export class TableContentModule { }
