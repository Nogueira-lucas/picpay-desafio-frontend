import { SharedModule } from '../../shared/shared.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: [HomeComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' },]
})
export class HomeModule { }
