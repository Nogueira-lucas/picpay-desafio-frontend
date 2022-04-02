import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"],
})
export class PageNotFoundComponent {
  constructor(private router: Router, private authService: AuthService) {}

  goBack() {
    if (this.authService.isAuthenticated()) {
      return this.router.navigate(["payments"]);
    }
    return this.router.navigate([""]);
  }
}
