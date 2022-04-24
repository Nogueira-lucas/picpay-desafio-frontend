import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ButtonConfig } from 'src/app/_components/button/button-config';
import { PayModalService } from 'src/app/_components/modal/pay-modal.service';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

    closeConfig: ButtonConfig;
    logoutConfig: ButtonConfig;

    user: User;

    modalId = 'profile-modal';

    constructor(
        private userService: UserService,
        private modalService: PayModalService
    ) { }

    ngOnInit(): void {
        this.user = this.userService.userValue;
        this.closeConfig = {
            label: 'Fechar'
        }
        this.logoutConfig = {
            label: 'Sair',
            type: 'danger'
        }
    }

    ngAfterViewInit(): void {
        this.modalService.open(this.modalId);
    }

    logout() {
        this.userService.logout();
        this.modalService.close(this.modalId);
    }

    closeModal() {
        this.modalService.close(this.modalId);
    }
}