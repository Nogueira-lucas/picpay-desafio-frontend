import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { PayModalService } from './pay-modal.service';

@Component({
    selector: 'pay-modal',
    templateUrl: 'pay-modal.component.html',
    styleUrls: ['pay-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PayModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private payModalService: PayModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        if (!this.id) return;

        document.body.appendChild(this.element);

        this.element.addEventListener('click', el => {
            if (el.target.className === 'pay-modal') {
                this.close();
            }
        });

        this.payModalService.add(this);
    }

    ngOnDestroy(): void {
        this.element.remove();
        this.payModalService.remove(this.id);
    }

    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('pay-modal-open');
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('pay-modal-open');
    }
}