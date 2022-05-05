import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { PaymentsService } from 'src/app/services/payments.service';
import { PaymentsComponent } from './payments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('PaymentsComponent', () => {
  let debugElement: DebugElement;
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        PaymentsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stream', async () => {
    expect(component.dataSource).not.toBeFalse()
  })

  it('should get by user name', async () => {
    const filterSpy = spyOn(component, 'filterByUsername') 
    await component.filterInputForm.setValue('gdeex7')
    await component.filterByUsername()
    expect(filterSpy).not.toThrow()
    expect(filterSpy).toHaveBeenCalled()
  })
});
