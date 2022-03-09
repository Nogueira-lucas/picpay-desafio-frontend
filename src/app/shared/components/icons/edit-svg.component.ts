import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'icon-edit',
    template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="dimensoes" [attr.height]="dimensoes" viewBox="0 0 24 24" [attr.fill]="color" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" [attr.color]="color"></path></svg>` 
})
export class IconEditComponent  {
    @Input() color: string
    @Input() dimensoes: string
    ngOnInit(){
        if(!this.color) this.color = 'none'
        if(!this.dimensoes) this.dimensoes = '18'
    }
}
