import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../../services/auth.service";
import { Router } from "@angular/router";
import { ProfileComponent } from "../../profile/profile.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate([""]);
  }

  viewProfile() {
    this.dialog.open(ProfileComponent);
  }
}
