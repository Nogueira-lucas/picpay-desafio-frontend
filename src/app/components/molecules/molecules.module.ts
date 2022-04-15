import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { CountPageComponent } from './count-page/count-page.component';

import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [FormLoginComponent, HeaderComponent, TableComponent, CountPageComponent],
  exports: [FormLoginComponent, HeaderComponent, TableComponent, CountPageComponent],
  imports: [
    CommonModule,
    AtomsModule
  ]
})
export class MoleculesModule { }
