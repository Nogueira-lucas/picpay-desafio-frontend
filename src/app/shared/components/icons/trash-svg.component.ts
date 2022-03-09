import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'icon-trash',
    template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="dimensoes" [attr.height]="dimensoes" viewBox="0 0 24 24" [attr.fill]="color" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" [attr.color]="color"></path></svg>` 
})
export class IconTrashComponent  {
    @Input() color: string
    @Input() dimensoes: string
    ngOnInit(){
        if(!this.color) this.color = 'none'
        if(!this.dimensoes) this.dimensoes = '18'
    }    
}
