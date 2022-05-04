import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { PaymentsService } from 'src/app/services/payments.service';

import { CreatePaymentModalComponent } from './create-payment-modal.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

describe('CreatePaymentModalComponent', () => {
  let component: CreatePaymentModalComponent;
  let fixture: ComponentFixture<CreatePaymentModalComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const dialogMock = {
      close: () => { }
    };
    await TestBed.configureTestingModule({
      declarations: [ CreatePaymentModalComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(maskConfig),
      ],
      providers: [
        PaymentsService,
        {provide: MatDialogRef, useValue: dialogMock},
        {
          provide: MAT_DIALOG_DATA, useValue: {
            data: {}
          }
        }
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
  
  it('should be able create a new payment', async () => {
    const executeSpy = spyOn(component, 'execute')
    await component.form.patchValue({
      username: 'lucas',
      value: 999.00,
      date: new Date(),
      title: 'teste do modal'
    })
   
    await debugElement   
      .query(By.css('.payment-modal-options-submit'))
      .triggerEventHandler('click', null);

    await expect(executeSpy).toHaveBeenCalled()
  })

  it('should be able edit a payment', async () => {
    component.data.id = 177
    const executeSpy = spyOn(component, 'execute')
    await component.form.patchValue({
      username: 'lucas',
      value: 999.00,
      date: new Date(),
      title: 'teste do modal'
    })
   
    await debugElement   
      .query(By.css('.payment-modal-options-submit'))
      .triggerEventHandler('click', null);

    await expect(executeSpy).toHaveBeenCalled()
  })

});
