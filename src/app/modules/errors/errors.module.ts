import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
import { ErrorsRoutingModule } from './errors-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ErrorsRoutingModule, MaterialModule],
})
export class ErrorsModule {}
