import { EditTaskModule } from './../../shared/components/edit-task/edit-task.module';
import { SharedModule } from '../../shared/shared.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from 'src/app/shared/utils/mat-custom-paginator-intl';
import { DeleteTaskModule } from '../../shared/components/delete-task/delete-task.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedModule,
    EditTaskModule,
    DeleteTaskModule
  ],
  exports: [HomeComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' },{
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl,
  },]
})
export class HomeModule { }
