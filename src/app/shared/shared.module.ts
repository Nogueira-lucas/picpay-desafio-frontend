import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { LogoSVGComponent } from './components/logo/logo-svg.component';
import { IconEditComponent } from './components/icons/edit-svg.component';
import { IconTrashComponent } from './components/icons/trash-svg.component';
import { IconFilterComponent } from './components/icons/filter-svg.component';



@NgModule({
  declarations: [
    AlertComponent,
    LoadingComponent,
    NavBarComponent,
    LogoSVGComponent,
    IconEditComponent,
    IconFilterComponent,
    IconTrashComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[    
    AlertComponent,
    LoadingComponent,
    NavBarComponent,
    LogoSVGComponent,
    IconEditComponent,
    IconFilterComponent,
    IconTrashComponent
  ]
})
export class SharedModule { }
