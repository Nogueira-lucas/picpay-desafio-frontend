import { EditTaskModule } from './components/edit-task/edit-task.module';
import { SharedModule } from '../../shared/shared.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from 'src/app/shared/utils/mat-custom-paginator-intl';
import { DeleteTaskModule } from './components/delete-task/delete-task.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    SharedModule,
    EditTaskModule,
    DeleteTaskModule,
  ],
  exports: [TasksComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' },{
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl,
  },]
})
export class TasksModule { }
