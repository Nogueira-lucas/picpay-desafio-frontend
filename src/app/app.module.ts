import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { AppRoutingModule } from './app.routes';
import { TasksTableComponent } from './tasks/tasks-table/tasks-table.component';
import { MatPaginatorIntlBR } from '@core/mat-paginator.service';
import { MomentPipe } from '@core/moment.pipe';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TaskModalComponent } from './tasks/task-modal/task-modal.component';
import { TaskDeleteConfirmModalComponent } from './tasks/task-delete-confirm-modal/task-delete-confirm-modal.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent, LoginComponent, LoginFormComponent, TasksComponent, TasksTableComponent,
    MomentPipe,
    TaskModalComponent,
    TaskDeleteConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,

    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlBR },
    { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: { formFieldAppearance: 'outline' } },
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
