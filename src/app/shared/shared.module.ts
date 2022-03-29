import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './components/alert/alert.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SortableDirective } from './directives/sortable.directive';

@NgModule({
    declarations: [ErrorMessageComponent, AlertComponent, NavBarComponent, SortableDirective],
    imports: [CommonModule, NgbModule],
    exports: [ErrorMessageComponent, AlertComponent, NavBarComponent, SortableDirective],
})
export class SharedModule {}
