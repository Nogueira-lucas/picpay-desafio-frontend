import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AccountService } from './services/account/account.service';
import { TaskService } from './services/task/task.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CommonModule> {
      return {
          ngModule: CoreModule,
          providers: [
            AccountService,
            TaskService,
            { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

          ]
      };
  }
}
