import { LocalStorageService } from './../../../../core/services/local-storage.service';
import { SharedModule } from './../../../shared.module';
import { MainRoutingModule } from './main.routing';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MainComponent } from './main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CountdownModule } from 'ngx-countdown';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { TableService } from 'src/core/services/table.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPtPaginatorIntl } from 'src/core/utils/paginator';

describe ("MainComponent", () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MainComponent],
            imports: [
                CommonModule,
                MainRoutingModule,
                CountdownModule,
                //region Material Modules
                MatToolbarModule,
                MatIconModule,
                MatMenuModule,
                //endregion Material Modules
                SharedModule,
                HttpClientModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [
                LocalStorageService,
                DatePipe,
                CurrencyPipe,
                TableService,
                {
                provide: MatPaginatorIntl,
                useValue: getPtPaginatorIntl(),
                },
            ]

        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
})