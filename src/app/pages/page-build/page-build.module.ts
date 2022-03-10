import { RouterModule } from '@angular/router';
import { HeaderModule } from './../../shared/components/header/header.module';
import { PageBuildRoutingModule } from './page-build-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuildComponent } from './page-build.component';



@NgModule({
  declarations: [
    PageBuildComponent
  ],
  imports: [
    CommonModule,
    PageBuildRoutingModule,
    HeaderModule
  ],
  exports: []
})
export class PageBuildModule { }
