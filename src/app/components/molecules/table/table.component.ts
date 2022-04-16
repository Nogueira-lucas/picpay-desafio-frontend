import { Component, Input } from '@angular/core';

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
  
  onClick(values){
    console.log('>>>>click: ', values);
  }
  
  onCheck(values){
    console.log('check:<<<< ', values);
  }
  
  ngOnInit(): void {

  }

}
