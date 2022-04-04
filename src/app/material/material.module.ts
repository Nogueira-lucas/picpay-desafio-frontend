import { NgModule } from "@angular/core";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { MatPaginatorIntlPtbr } from "./componets/Intl/mat-paginator.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';

const MaterialComponents = [
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatMenuModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtbr }],
})
export class MaterialModule {}
