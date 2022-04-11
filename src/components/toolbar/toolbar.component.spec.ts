import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from 'src/core/material/material.module';

describe('Component: Toolbar', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolbarComponent],
            imports: [RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule, MaterialModule]
        })
            .compileComponents();
        router = TestBed.inject(Router);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`Given a login-button
    when clicked
    Must redirect to 'login' route`, () => {
        spyOn(router, 'navigate');

        const userMenuButton = fixture.nativeElement.querySelector('#userMenu');
        userMenuButton.click();

        fixture.whenStable().then(() => {
            setTimeout(() => {
                const logoutButton = fixture.nativeElement.querySelector('#logout-button');
                logoutButton.click();
                fixture.whenStable().then(() => {
                    expect(router.navigate).toHaveBeenCalledWith(['/login']);
                });
            }, 1000);
           
        });


    });
});
