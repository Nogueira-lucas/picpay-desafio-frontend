import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MyPaymentsComponent } from "./pages/my-payments/my-payments.component";

const routes: Routes = [
  { path: "", component: LoginPageComponent },
  { path: "my-payments", component: MyPaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
