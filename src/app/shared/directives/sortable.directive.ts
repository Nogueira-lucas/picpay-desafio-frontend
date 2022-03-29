import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { SortDirection } from '../models/sort-direction';
import { SortEvent } from '../models/sort-event';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

@Directive({
    selector: 'th[sortable]',
})
export class SortableDirective {
    @Input() sortable = '';
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    @HostBinding('class.asc')
    get ascending(): boolean {
        return this.direction === 'asc';
    }

    @HostBinding('class.desc')
    get descending(): boolean {
        return this.direction === 'desc';
    }

    @HostListener('click')
    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}
