import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';

import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [FormLoginComponent, HeaderComponent, TableComponent],
  exports: [FormLoginComponent, HeaderComponent, TableComponent],
  imports: [
    CommonModule,
    AtomsModule
  ]
})
export class MoleculesModule { }
