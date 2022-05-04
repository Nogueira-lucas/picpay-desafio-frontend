import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./services/auth.service";
import { switchMap} from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {}
  
    canActivate(): Observable<boolean> {
      
      return this.authService.isAuthenticated$.pipe(
        switchMap((isAuthenticated) => {
          if (!isAuthenticated) {
            this.router.navigate(['/login']);
          }
          return of(isAuthenticated);
        })
      );
    }
  }

