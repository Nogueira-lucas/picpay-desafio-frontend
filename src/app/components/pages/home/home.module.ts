import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../molecules/header/header.component';
import { AtomsModule } from '../../atoms/atoms.module';

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  exports: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    AtomsModule
  ]
})
export class HomeModule { }
