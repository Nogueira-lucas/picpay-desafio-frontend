import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { MaterialModule } from 'src/app/material.module';
import { PaymentsService } from 'src/app/services/payments.service';

import { DeletePaymentModalComponent } from './delete-payment-modal.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

describe('DeletePaymentModalComponent', () => {
  let component: DeletePaymentModalComponent;
  let fixture: ComponentFixture<DeletePaymentModalComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePaymentModalComponent ],
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
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            data: {
              id: 0
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able delete a payment', async () => {
    const excluirSpy = spyOn(component, 'excluirPagamento')

    await component.ngOnInit()
    
    await debugElement   
    .query(By.css('.btnExcluir'))
    .triggerEventHandler('click', null);

    expect(excluirSpy).toHaveBeenCalled()
  })
});
