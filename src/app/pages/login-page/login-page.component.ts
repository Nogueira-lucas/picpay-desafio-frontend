import { Component, OnInit } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  loginImagePath: string = "assets/images/login-image.svg";
  flexDirectionColumn: Boolean = false;
  columnBreakpoint: string = "(min-width: 605px)";

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([this.columnBreakpoint])

      .subscribe((result) => {
        if (!result.breakpoints[this.columnBreakpoint]) {
          this.flexDirectionColumn = true;
        } else {
          this.flexDirectionColumn = false;
        }
      });
  }
}
