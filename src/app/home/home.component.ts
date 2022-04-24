import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProfileComponent } from '../user/profile/profile.component';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {

    @ViewChild('profile', {read: ViewContainerRef}) profileModal: ViewContainerRef

    constructor(private componentFactory: ComponentFactoryResolver) { }

    onProfileClick() {
        const profileFactory = this.componentFactory.resolveComponentFactory(ProfileComponent)
        this.profileModal.createComponent(profileFactory)
    }

}