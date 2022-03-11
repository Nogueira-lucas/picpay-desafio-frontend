import { Router } from '@angular/router';
import { TransactionStatusService } from './../../shared/services/transaction-status/transaction-status.service';
import { IAccountUser } from 'src/app/shared/interfaces/account.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackgroundTemplateTypes } from 'src/app/shared/interfaces/transaction-status.interface';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  userSource: IAccountUser;
  hide: boolean;
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Escolha uma foto';
  userAvatar = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private transactionService: TransactionStatusService) {}

  ngOnInit(): void {

    this.authService.authState$.subscribe(data => {
      this.userSource = data.usr;
      this.userAvatar = this.userSource.avatar;
      this.form = this.fb.group({
        name: [this.userSource.name, Validators.required],
        email: [this.userSource.email, [Validators.required, Validators.email]],
        avatar: [this.userSource.avatar, Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    });

  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    this.userSource = { ...this.userSource, ...this.form.value, ...{avatar: this.userAvatar} };
    this.authService.updateAccount(this.userSource).subscribe(data => {
      this.transactionService.show('As alterações foram salvas com sucesso!', BackgroundTemplateTypes.success);
      this.router.navigate(['/']);
    }, _ =>
    this.transactionService.show(
      'Não foi possível atualizar seus dados, tente novamente por favor.', BackgroundTemplateTypes.error));
  }

  uploadFile(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.userAvatar = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Escolha uma foto';
    }
  }
}
