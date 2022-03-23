import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRouterModule } from './home-router.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRouterModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }