import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'icon-filter',
    template: `<svg xmlns="http://www.w3.org/2000/svg" [attr.width]="dimension" [attr.height]="dimension" viewBox="0 0 24 24" [attr.fill]="color" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" [attr.color]="color"></polygon></svg>` 
})
export class IconFilterComponent  {
    @Input() color: string
    @Input() dimension: string
    ngOnInit(){
        if(!this.color) this.color = 'none'
        if(!this.dimension) this.dimension = '18'
    }
}


