import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let notificationService: NotificationService,
    httpTestingController: HttpTestingController,
    toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [NotificationService, { provide: ToastrService, useValue: toastrService }],
    }).compileComponents();
    notificationService = TestBed.inject(NotificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should test "showSuccess" method', () => {
    notificationService.showSuccess('hello world', 'hello');
    expect(toastrService.success).toHaveBeenCalledWith('hello world', 'hello');
  });

  it('should test "showError" method', () => {
    notificationService.showError('hello world', 'hello');
    expect(toastrService.error).toHaveBeenCalledWith('hello world', 'hello');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
