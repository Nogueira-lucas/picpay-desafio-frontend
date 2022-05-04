import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSortModule} from '@angular/material/sort';



const material_components = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatDividerModule,
  MatDialogModule,
  MatRadioModule,
  MatSidenavModule,
  MatCardModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatSortModule,
  MatNativeDateModule
];

@NgModule({
  imports: [
    ...material_components
  ],
  exports: [
    ...material_components
  ]
})
export class MaterialModule { }