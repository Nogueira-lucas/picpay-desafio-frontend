import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {

  @Input()
  list: object[]
  
  @Input()
  tableHead: string[]
  
  listItem(items){
    return items.items
  }
  
  @Output() callback = new EventEmitter<any>();

  @Output() callbackEdit = new EventEmitter<any>();

  @Output() callbackDelete = new EventEmitter<any>();

  onClick(event) {
    !!this.callback && this.callback.emit(event);
  }

  onEdit(event) {
    !!this.callbackEdit && this.callbackEdit.emit(event['data-id']);
  }

  onDelete(event) {
    !!this.callbackDelete && this.callbackDelete.emit(event['data-id']);
  }

  onCheck(event){
    !!this.callbackEdit && this.callbackEdit.emit(event);
  }

}
