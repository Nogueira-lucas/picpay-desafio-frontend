import { LocalStorageService } from './../../../../../core/services/local-storage.service';
import { ProfileRoutingModule } from './profile.routing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileComponent } from './profile.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe ("ProfileComponent", () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            imports: [
                CommonModule,
                ProfileRoutingModule,
                HttpClientModule,
                RouterModule,
                RouterTestingModule,
                FormsModule,
                //region Material Modules
                MatExpansionModule,
                MatProgressSpinnerModule
                //endregion
            ],
            providers: [
                LocalStorageService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});