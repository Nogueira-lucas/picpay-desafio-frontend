import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GenerateRandomString {
    constructor() { }

    create(name: string) {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return name.split(' ')[0].concat(text).trim().toLowerCase();
    }

}