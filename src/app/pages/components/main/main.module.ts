import { MainRoutes } from './main.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutes
  ],
  declarations: [MainComponent]
})
export class MainModule { }
