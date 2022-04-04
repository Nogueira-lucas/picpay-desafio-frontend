import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UserProfile } from '../../../auth/model/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userData: UserProfile;

  constructor(private authService: AuthService) {
    this.userData = this.authService.getUserData()
   }

  ngOnInit(): void {
  }

}
