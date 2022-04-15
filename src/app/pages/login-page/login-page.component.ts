import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

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

// XSmall (max-width: 599.98px)
// Small (min-width: 600px) and (max-width: 959.98px)
// Medium (min-width: 960px) and (max-width: 1279.98px)
// Large (min-width: 1280px) and (max-width: 1919.98px)
// XLarge (min-width: 1920px)
