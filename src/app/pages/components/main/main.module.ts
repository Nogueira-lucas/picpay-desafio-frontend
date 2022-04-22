import { SharedModule } from './../../../shared.module';
import { MainRoutingModule } from './main.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    CountdownModule,
    //region Material Modules
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    //endregion Material Modules
  ],
  declarations: [
    MainComponent,
  ]
})
export class MainModule { }
