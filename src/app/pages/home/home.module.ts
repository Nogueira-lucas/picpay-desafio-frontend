import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

import { HomeRouterModule } from './home-router.module';
import { HomeComponent } from './home.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRouterModule,
    MaterialModule
  ],
  exports: [HomeComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' },]
})
export class HomeModule { }