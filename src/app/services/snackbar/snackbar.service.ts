import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    action: string,
    duration: number,
    verticalPosition: MatSnackBarVerticalPosition
  ) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition,
    });
  }
}
