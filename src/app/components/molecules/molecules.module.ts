import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';
import { HeaderComponent } from './header/header.component';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [FormLoginComponent, HeaderComponent],
  exports: [FormLoginComponent, HeaderComponent],
  imports: [
    CommonModule,
    AtomsModule
  ]
})
export class MoleculesModule { }
